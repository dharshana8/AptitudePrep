import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useTimer } from '@hooks/useTimer';
import { useRecorder } from '@hooks/useRecorder';
import { api } from '@services/api';
import { getRandomTopic, speakingPrompts, helpPrompts } from '@data/speakingTopics';
import { formatTime } from '@utils/helpers';

export default function SpeakingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category') || null;
  const [topic, setTopic] = useState(null);
  const [phase, setPhase] = useState('topic');
  const [prepareTime, setPrepareTime] = useState(30);
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [saving, setSaving] = useState(false);
  const [speakDuration, setSpeakDuration] = useState(120);

  const { timeLeft: prepTimeLeft, formatted: prepFormatted, isRunning: prepRunning, start: startPrep, pause: pausePrep, reset: resetPrep } = useTimer(30);
  const { timeLeft: speakTimeLeft, formatted: speakFormatted, isRunning: speakRunning, progress: speakProgress, start: startSpeak, pause: pauseSpeak, reset: resetSpeak } = useTimer(speakDuration);
  const { isRecording, recordings, startRecording, stopRecording, clearRecordings, getAudioData } = useRecorder();

  useEffect(() => {
    const newTopic = getRandomTopic(category);
    setTopic(newTopic);
    setPhase('topic');
    resetPrep();
    resetSpeak(speakDuration);
    clearRecordings();
    setAttempts([]);
    setCurrentAttempt(0);
  }, [category, speakDuration]);

  useEffect(() => {
    if (phase === 'prepare' && prepRunning && prepTimeLeft === 0) {
      setPhase('speaking');
      startSpeak();
      startRecording();
    }
  }, [prepTimeLeft, prepRunning, phase]);

  useEffect(() => {
    if (phase === 'speaking' && speakRunning) {
      const prompt = speakingPrompts.find(p => p.time === 120 - speakTimeLeft);
      if (prompt && !showPrompt) {
        setCurrentPrompt(prompt.text);
        setShowPrompt(true);
        setTimeout(() => setShowPrompt(false), 5000);
      }
    }
  }, [speakTimeLeft, speakRunning, phase, showPrompt]);

  useEffect(() => {
    if (phase === 'speaking' && speakTimeLeft === 0) {
      stopRecording();
      pauseSpeak();
    }
  }, [speakTimeLeft, phase, stopRecording, pauseSpeak]);

  useEffect(() => {
    const latestRecording = recordings[recordings.length - 1];
    if (phase === 'speaking' && latestRecording && !attempts.some(attempt => attempt.url === latestRecording.url)) {
      setAttempts(prev => [...prev, {
        url: latestRecording.url,
        blob: latestRecording.blob,
        audioUrl: latestRecording.url,
        duration: speakDuration - speakTimeLeft,
        timestamp: latestRecording.timestamp,
      }]);
      setCurrentAttempt(prev => prev + 1);
      setPhase('review');
    }
  }, [recordings, phase, attempts, speakDuration, speakTimeLeft]);

  const handleStartPrepare = () => {
    setPhase('prepare');
    startPrep();
  };

  const handleSkipPrepare = () => {
    pausePrep();
    setPhase('speaking');
    resetSpeak(speakDuration);
    startSpeak();
    startRecording();
  };

  const handleRecordAgain = () => {
    setPhase('speaking');
    resetSpeak(speakDuration);
    startSpeak();
    startRecording();
  };

  const handleHelp = () => {
    const prompt = helpPrompts[Math.floor(Math.random() * helpPrompts.length)];
    setCurrentPrompt(prompt);
    setShowPrompt(true);
    setTimeout(() => setShowPrompt(false), 8000);
  };

  const handleSave = async () => {
    if (attempts.length === 0) return;
    setSaving(true);
    try {
      const latestAttempt = attempts[attempts.length - 1];
      const audioData = await getAudioData(latestAttempt.blob);
      await api.post('/communication/session', {
        topic: topic.topic,
        category: topic.category,
        duration: latestAttempt.duration,
        attemptNumber: currentAttempt,
        selfRating: 0,
        feedback: '',
        improvementFocus: '',
        audioData,
      });
      navigate('/communication');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!topic) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link to="/communication" className="inline-block text-sm text-slate-500 hover:text-slate-700 mb-4">
          ← Back to Communication
        </Link>
        <p className="text-sm text-slate-500">
          {phase === 'topic' && 'Ready to speak'}
          {phase === 'prepare' && 'Prepare your thoughts'}
          {phase === 'speaking' && 'Speak now!'}
          {phase === 'review' && 'Review your recording'}
        </p>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">{topic.topic}</h1>
        <p className="text-sm text-slate-400 mt-1">Category: {topic.category}</p>
        {phase === 'topic' && (
          <label className="inline-flex items-center gap-2 mt-4 text-sm text-slate-600">
            Speaking time
            <select
              value={speakDuration}
              onChange={event => setSpeakDuration(Number(event.target.value))}
              className="border border-slate-300 rounded-lg px-2 py-1 bg-white"
            >
              <option value={60}>1 minute</option>
              <option value={120}>2 minutes</option>
            </select>
          </label>
        )}
      </div>

      {phase === 'topic' && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="text-5xl">🎤</span>
          </div>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Take a moment to think about the topic. You'll have 30 seconds to prepare, then {speakDuration / 60} minutes to speak.
          </p>
          <button
            onClick={handleStartPrepare}
            className="px-8 py-3 bg-slate-800 text-white rounded-lg font-medium text-lg hover:bg-slate-700 transition-colors"
          >
            Start Preparation (30s)
          </button>
        </div>
      )}

      {phase === 'prepare' && (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-blue-200 flex items-center justify-center relative">
              <div className="w-24 h-24 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              <span className="absolute text-3xl font-bold text-blue-600">{prepFormatted}</span>
            </div>
            <p className="text-slate-500">Preparation Time</p>
          </div>
          <p className="text-center text-slate-600 mb-6">
            Think about: What's your opinion? Any examples? How will you start and conclude?
          </p>
          <button
            onClick={() => prepRunning ? pausePrep() : startPrep()}
            className="w-full py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700"
          >
            {prepRunning ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={handleSkipPrepare}
            className="w-full mt-3 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
          >
            Skip Preparation and Start Speaking
          </button>
        </div>
      )}

      {phase === 'speaking' && (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className={`w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center relative ${speakTimeLeft <= 30 ? 'border-4 border-red-200' : 'border-4 border-green-200'
              }`}>
              <div className={`w-24 h-24 rounded-full border-4 ${speakTimeLeft <= 30 ? 'border-red-500' : 'border-green-500'
                } border-t-transparent animate-spin`} />
              <span className={`absolute text-3xl font-bold ${speakTimeLeft <= 30 ? 'text-red-600' : 'text-green-600'
                }`}>{speakFormatted}</span>
            </div>
            <p className="text-slate-500">Speaking Time - {speakTimeLeft <= 30 ? '⚠️ Hurry!' : 'Keep going!'}</p>
          </div>

          {showPrompt && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-pulse">
              <p className="text-sm text-blue-600 font-medium">💡 Prompt</p>
              <p className="text-blue-800">{currentPrompt}</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={stopRecording}
              disabled={!isRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-red-100 text-red-500'
                }`}
            >
              {isRecording ? '■' : '●'}
            </button>
            <button
              onClick={handleHelp}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
            >
              💡 Help Me Continue
            </button>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${speakTimeLeft <= 30 ? 'bg-red-500' : 'bg-green-500'
                }`}
              style={{ width: `${speakProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">
            {isRecording ? 'Recording...' : 'Click record to start'}
          </p>
        </div>
      )}

      {phase === 'review' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Attempt {currentAttempt} of {attempts.length}</h3>
            {attempts.length > 0 && (
              <audio controls src={attempts[attempts.length - 1].audioUrl} className="w-full" />
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleRecordAgain}
                className="flex-1 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700"
              >
                Record Again
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
              >
                {saving ? 'Saving...' : 'Save & Finish'}
              </button>
            </div>
          </div>

          {attempts.length > 1 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Previous Attempts</h3>
              <div className="space-y-3">
                {attempts.slice(0, -1).map((attempt, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg">
                    <audio controls src={attempt.audioUrl} className="w-full" />
                    <p className="text-xs text-slate-400 text-right mt-1">
                      Attempt {i + 1} • {formatTime(attempt.duration)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}