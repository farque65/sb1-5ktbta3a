import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { ReviewList } from '../types';
import { getReviewLists, removeCardFromList } from '../utils/reviewLists';
import { showMotivationalNotification } from '../utils/notifications';
import AddToListModal from '../components/AddToListModal';

const ReviewFlashcards = () => {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const [list, setList] = useState<ReviewList | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const lists = getReviewLists();
    const currentList = lists.find(l => l.id === listId);
    if (currentList) {
      setList(currentList);
    } else {
      navigate('/review');
    }
  }, [listId, navigate]);

  const nextCard = () => {
    if (list) {
      setCurrentCard((prev) => (prev + 1) % list.cards.length);
      setIsFlipped(false);
      showMotivationalNotification('card');
    }
  };

  const previousCard = () => {
    if (list) {
      setCurrentCard((prev) => 
        prev === 0 ? list.cards.length - 1 : prev - 1
      );
      setIsFlipped(false);
    }
  };

  const handleRemoveCard = () => {
    if (list && listId) {
      removeCardFromList(listId, list.cards[currentCard]);
      const updatedLists = getReviewLists();
      const updatedList = updatedLists.find(l => l.id === listId);
      
      if (!updatedList || updatedList.cards.length === 0) {
        navigate('/review');
        return;
      }

      setList(updatedList);
      if (currentCard >= updatedList.cards.length) {
        setCurrentCard(updatedList.cards.length - 1);
      }
    }
  };

  if (!list || list.cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/review')}
              className="flex items-center space-x-2 text-white hover:text-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Lists</span>
            </button>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">No cards in this list</h2>
            <p className="text-gray-600 mb-4">Add some cards to get started!</p>
            <button
              onClick={() => navigate('/flashcards')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Go to Flashcards
            </button>
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
            onClick={() => navigate('/review')}
            className="flex items-center space-x-2 text-white hover:text-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Lists</span>
          </button>
          <h1 className="text-3xl font-bold text-white text-center">{list.name}</h1>
          <div className="w-24"></div>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-white rounded-2xl shadow-xl p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl transition-shadow"
            >
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Card {currentCard + 1} of {list.cards.length}
                </p>
                <p className="text-3xl font-bold mb-4 text-gray-800">
                  {isFlipped ? list.cards[currentCard].english : list.cards[currentCard].french}
                </p>
                <p className="text-gray-500 text-sm">
                  {isFlipped ? 'Click to see French' : 'Click to see English'}
                </p>
              </div>
            </div>

            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handleRemoveCard}
                className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
                title="Remove from this list"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                title="Add to another list"
              >
                <Plus className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={previousCard}
              className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            <button
              onClick={nextCard}
              className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <AddToListModal
          card={list.cards[currentCard]}
          currentListId={list.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ReviewFlashcards;