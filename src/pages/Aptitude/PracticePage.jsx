import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@services/api';
import { getQuestionsByTopic } from '@data/questionBank';
import { getAptitudeContent } from '@data/aptitudeContent';
import { numberSystemContent } from '@data/numberSystemContent';
import { formatTime, selectRandomQuestions } from '@utils/helpers';

export default function PracticePage() {
  const { topicId, subTopicId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [dareMode, setDareMode] = useState(false);
  const [dareText, setDareText] = useState('');
  const [dareCompleted, setDareCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timer, setTimer] = useState(0);
  const [weakAreas, setWeakAreas] = useState([]);

  useEffect(() => {
    loadQuestions();
    startTimer();
  }, [topicId, subTopicId]);

  const loadQuestions = () => {
    const authoredQuestions = getQuestionsByTopic(topicId, subTopicId);
    const generatedQuestions = topicId === 'number-system'
      ? numberSystemContent.assessmentQuestions
      : getAptitudeContent(topicId)?.assessmentQuestions || [];
    const qs = authoredQuestions.length > 0 ? authoredQuestions : generatedQuestions;
    const selected = selectRandomQuestions(qs, 10);
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

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      navigate(`/aptitude/topic/${topicId}/test`);
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

  if (loading) return <div className="text-slate-400">Loading...</div>;

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Practice Mode</p>
          <h1 className="text-xl font-bold text-slate-800">Question {currentIndex + 1} of {questions.length}</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Score: {score.correct}/{score.total}</p>
          <p className="text-xs text-slate-400">Time: {formatTime(timer)}</p>
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
            <p className="text-green-700 font-medium">✓ Dare completed! Answer revealed.</p>
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
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
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
              className="w-full py-2 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
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
              {currentIndex === questions.length - 1 ? 'Finish & Go to Test' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}