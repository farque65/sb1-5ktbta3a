import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddToQuizListModal from '../components/AddToQuizListModal';
import { QuizReviewList } from '../types';
import { showMotivationalNotification } from '../utils/notifications';
import { getQuizReviewLists, removeQuestionFromList } from '../utils/quizReviewLists';

const ReviewQuiz = () => {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const [list, setList] = useState<QuizReviewList | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const lists = getQuizReviewLists();
    const currentList = lists.find(l => l.id === listId);
    if (currentList) {
      setList(currentList);
    } else {
      navigate('/quiz-review');
    }
  }, [listId, navigate]);

  const handleAnswerClick = (answer: string) => {
    if (!list) return;
    
    setSelectedAnswer(answer);
    
    if (answer === list.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < list.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        showMotivationalNotification('quiz');
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRemoveQuestion = () => {
    if (list && listId) {
      removeQuestionFromList(listId, list.questions[currentQuestion]);
      const updatedLists = getQuizReviewLists();
      const updatedList = updatedLists.find(l => l.id === listId);
      
      if (!updatedList || updatedList.questions.length === 0) {
        navigate('/quiz-review');
        return;
      }

      setList(updatedList);
      if (currentQuestion >= updatedList.questions.length) {
        setCurrentQuestion(updatedList.questions.length - 1);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  if (!list || list.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/quiz-review')}
              className="flex items-center space-x-2 text-white hover:text-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Lists</span>
            </button>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">No questions in this list</h2>
            <p className="text-gray-600 mb-4">Add some questions to get started!</p>
            <button
              onClick={() => navigate('/quiz')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Go to Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Quiz Complete!</h2>
            <p className="text-xl text-center mb-6">
              You scored {score} out of {list.questions.length}
            </p>
            <div className="space-y-4">
              <button
                onClick={restartQuiz}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/quiz-review')}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Lists
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/quiz-review')}
            className="flex items-center space-x-2 text-white hover:text-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Lists</span>
          </button>
          <h1 className="text-3xl font-bold text-white text-center">{list.name}</h1>
          <div className="w-24"></div>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="relative bg-white rounded-lg shadow-lg p-8">
            <div className="mb-4">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1}/{list.questions.length}
              </span>
            </div>
            
            {list.questions[currentQuestion]?.info && 
              <h2 className="text-xl font-semibold mb-6">
                {list.questions[currentQuestion].info}
              </h2>
            }

            <h2 className="text-xl mb-6">
              {list.questions[currentQuestion].question}
            </h2>

            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handleRemoveQuestion}
                className="p-2 bg-gray-100 rounded-full hover:bg-red-50 transition-colors"
                title="Remove from this list"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                title="Add to another list"
              >
                <Plus className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            
            <div className="space-y-3">
              {list.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    selectedAnswer === option
                      ? option === list.questions[currentQuestion].correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
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
          question={list.questions[currentQuestion]}
          currentListId={list.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ReviewQuiz;