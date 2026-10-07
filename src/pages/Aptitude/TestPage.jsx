import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@services/api';
import { getQuestionsByTopic } from '@data/questionBank';
import { getAptitudeContent } from '@data/aptitudeContent';
import { numberSystemContent } from '@data/numberSystemContent';
import { formatTime, calculatePercentage, selectRandomQuestions } from '@utils/helpers';
import { MASTERY_THRESHOLD } from '@data/aptitudeTopics';

export default function TestPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [dareMode, setDareMode] = useState(false);
  const [dareText, setDareText] = useState('');
  const [dareCompleted, setDareCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);

  useEffect(() => {
    loadQuestions();
    startTimer();
  }, [topicId]);

  const loadQuestions = () => {
    const authoredQuestions = getQuestionsByTopic(topicId);
    const generatedQuestions = topicId === 'number-system'
      ? numberSystemContent.assessmentQuestions
      : getAptitudeContent(topicId)?.assessmentQuestions || [];
    const qs = authoredQuestions.length > 0 ? authoredQuestions : generatedQuestions;
    const selected = selectRandomQuestions(qs, 15);
    setQuestions(selected);
    setLoading(false);
  };

  const startTimer = () => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  };

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option) => {
    if (showExplanation) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
    if (option === currentQuestion.correctAnswer) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setWeakAreas(prev => [...prev, currentQuestion.subTopic]);
    }
    setScore(prev => ({ ...prev, total: prev.total + 1 }));
    setShowExplanation(true);
  };

  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      submitTest();
    }
  };

  const handleDare = () => {
    const dares = [
      'Explain this concept in your own words for 30 seconds',
      'Give a real-life example of this concept',
      'Speak about this topic without using "um" or "uh"',
      'Teach this concept to an imaginary 5-year-old',
      'Recite the formula/rule from memory',
    ];
    setDareText(dares[Math.floor(Math.random() * dares.length)]);
    setDareMode(true);
    setDareCompleted(false);
  };

  const handleDareComplete = () => {
    setDareCompleted(true);
    setShowExplanation(true);
  };

  const submitTest = async () => {
    const percentage = calculatePercentage(score.correct, score.total);
    const patternTotals = {};
    const patternCorrect = {};

    questions.forEach(question => {
      const pattern = question.pattern || question.subTopic || 'general';
      patternTotals[pattern] = (patternTotals[pattern] || 0) + 1;
      if (answers[question.id] === question.correctAnswer) {
        patternCorrect[pattern] = (patternCorrect[pattern] || 0) + 1;
      }
    });

    const patternScores = Object.fromEntries(
      Object.entries(patternTotals).map(([pattern, total]) => [
        pattern,
        calculatePercentage(patternCorrect[pattern] || 0, total),
      ])
    );
    const patternsCovered = Object.values(patternScores).every(scoreValue => scoreValue >= MASTERY_THRESHOLD);
    const mastered = percentage >= MASTERY_THRESHOLD && patternsCovered;

    setResult({ percentage, mastered, score: score.correct, total: score.total, time: timer, patternScores });
    setTestSubmitted(true);

    try {
      await api.post('/aptitude/test/submit', {
        topicId,
        score: percentage,
        correct: score.correct,
        total: score.total,
        timeSpent: timer,
        weakAreas,
        answers,
        patternScores,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (testSubmitted && result) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold ${result.mastered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
            {result.percentage}%
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {result.mastered ? '🎉 Topic Mastered!' : '⚠ Keep Practicing'}
          </h1>
          <p className="text-slate-500 mb-6">
            You scored {result.score} out of {result.total} ({result.percentage}%)
          </p>
          <p className="text-sm text-slate-400 mb-8">
            Time taken: {formatTime(result.time)} | Mastery threshold: {MASTERY_THRESHOLD}%
          </p>

          {Object.keys(result.patternScores || {}).length > 0 && (
            <div className="mb-6 text-left">
              <p className="font-medium text-slate-700 mb-2">Pattern Performance</p>
              <div className="space-y-2">
                {Object.entries(result.patternScores).map(([pattern, patternScore]) => (
                  <div key={pattern} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 capitalize">{pattern.replaceAll('-', ' ')}</span>
                    <span className={patternScore >= MASTERY_THRESHOLD ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      {patternScore}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!result.mastered && weakAreas.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
              <p className="font-medium text-yellow-800 mb-2">Weak Areas Identified:</p>
              <ul className="space-y-1 text-sm text-yellow-700">
                {[...new Set(weakAreas)].map((area, i) => (
                  <li key={i} className="flex items-center gap-1">• {area}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            {result.mastered && (
              <button
                onClick={() => navigate('/aptitude')}
                className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700"
              >
                Continue to Next Topic
              </button>
            )}
            {!result.mastered && (
              <button
                onClick={() => navigate(`/aptitude/topic/${topicId}/practice`)}
                className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700"
              >
                Practice More
              </button>
            )}
            <button
              onClick={() => navigate(`/aptitude/topic/${topicId}`)}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
            >
              Back to Topic
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Mastery Test</p>
          <h1 className="text-xl font-bold text-slate-800">Question {currentIndex + 1} of {questions.length}</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Time: {formatTime(timer)}</p>
        </div>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {dareMode && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="font-semibold text-yellow-800 mb-2">😈 Dare Unlocked!</p>
          <p className="text-yellow-700 mb-4">{dareText}</p>
          {!dareCompleted ? (
            <button
              onClick={handleDareComplete}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700"
            >
              I Completed the Dare
            </button>
          ) : (
            <p className="text-green-700 font-medium">✓ Dare completed!</p>
          )}
        </div>
      )}

      {currentQuestion && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-slate-700 mb-6 text-lg">{currentQuestion.question}</p>

          <div className="space-y-3 mb-6">
            {currentQuestion.options?.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${showExplanation
                  ? option === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : option === answers[currentQuestion.id]
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-200'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
              >
                <span className="font-medium">{option}</span>
                {showExplanation && option === currentQuestion.correctAnswer && (
                  <span className="ml-2 text-green-600 text-sm">✓ Correct</span>
                )}
                {showExplanation && option === answers[currentQuestion.id] && option !== currentQuestion.correctAnswer && (
                  <span className="ml-2 text-red-600 text-sm">✗ Your answer</span>
                )}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg mb-4">
              <p className="font-medium text-blue-800 mb-2">Explanation</p>
              <p className="text-blue-700 text-sm">{currentQuestion.explanation}</p>
              <p className="text-xs text-blue-500 mt-2">
                Concept: {currentQuestion.subTopic} | Difficulty: {currentQuestion.difficulty}
              </p>
            </div>
          )}

          {!showExplanation && !dareMode && (
            <button
              onClick={handleDare}
              className="w-full py-2 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors mb-4"
            >
              🆘 Help (Unlock Dare)
            </button>
          )}

          <div className="flex justify-between mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => currentIndex > 0 && (setCurrentIndex(prev => prev - 1), setShowExplanation(false))}
              disabled={currentIndex === 0 || showExplanation}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!showExplanation && !dareCompleted && !dareMode}
              className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 disabled:opacity-50"
            >
              {currentIndex === questions.length - 1 ? 'Submit Test' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}