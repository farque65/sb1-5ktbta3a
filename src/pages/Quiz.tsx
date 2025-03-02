import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddToQuizListModal from '../components/AddToQuizListModal';
import { quizQuestions } from '../data/frenchData';
import { showMotivationalNotification } from '../utils/notifications';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        showMotivationalNotification('quiz');
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  if (showScore) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Quiz Complete!</h2>
            <p className="text-xl text-center mb-6">
              You scored {score} out of {quizQuestions.length}
            </p>
            <button
              onClick={restartQuiz}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">French Quiz</h1>
        
        <div className="max-w-md mx-auto">
          <div className="relative bg-white rounded-lg shadow-lg p-8">
            <div className="mb-4">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1}/{quizQuestions.length}
              </span>
            </div>
            
            {quizQuestions[currentQuestion]?.info && 
              <h2 className="text-xl font-semibold mb-6">
                {quizQuestions[currentQuestion].info}
              </h2>
            }

            <h2 className="text-xl mb-6">
              {quizQuestions[currentQuestion].question}
            </h2>
            
            <button
              onClick={() => setShowModal(true)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-5 h-5 text-blue-600" />
            </button>

            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    selectedAnswer === option
                      ? option === quizQuestions[currentQuestion].correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : selectedAnswer != null && selectedAnswer != option && option === quizQuestions[currentQuestion].correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                  } border ${
                    selectedAnswer === option ? 'border-2' : 'border'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AddToQuizListModal
          question={quizQuestions[currentQuestion]}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Quiz;