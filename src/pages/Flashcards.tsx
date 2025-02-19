import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Plus } from 'lucide-react';
import { flashCards } from '../data/frenchData';
import { showMotivationalNotification } from '../utils/notifications';
import AddToListModal from '../components/AddToListModal';

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState(flashCards);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const shuffleCards = () => {
      const cards = [...flashCards];
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      setShuffledCards(cards);
    };

    shuffleCards();
  }, []);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % shuffledCards.length);
    setIsFlipped(false);
    showMotivationalNotification('card');
  };

  const previousCard = () => {
    setCurrentCard((prev) => 
      prev === 0 ? shuffledCards.length - 1 : prev - 1
    );
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">French Flashcards</h1>
        
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-white rounded-2xl shadow-xl p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl transition-shadow"
            >
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Card {currentCard + 1} of {shuffledCards.length}
                </p>
                <p className="text-3xl font-bold mb-4 text-gray-800">
                  {isFlipped ? shuffledCards[currentCard].english : shuffledCards[currentCard].french}
                </p>
                <p className="text-gray-500 text-sm">
                  {isFlipped ? 'Click to see French' : 'Click to see English'}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowModal(true)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 text-blue-600" />
            </button>
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
          card={shuffledCards[currentCard]}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Flashcards;