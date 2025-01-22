import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { flashCards } from '../data/frenchData';
import { showMotivationalNotification } from '../utils/notification';

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashCards.length);
    setIsFlipped(false);
    showMotivationalNotification('card');
  };

  const previousCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashCards.length) % flashCards.length);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">French Flashcards</h1>
        
        <div className="max-w-md mx-auto">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="bg-white rounded-2xl shadow-xl p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl transition-shadow"
          >
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Card {currentCard + 1} of {flashCards.length}
              </p>
              <p className="text-3xl font-bold mb-4 text-gray-800">
                {isFlipped ? flashCards[currentCard].english : flashCards[currentCard].french}
              </p>
              <p className="text-gray-500 text-sm">
                {isFlipped ? 'Click to see French' : 'Click to see English'}
              </p>
            </div>
          </div>
        
          <div className="mt-8 flex justify-center">
            <button
              onClick={previousCard}
              className="mr-2 flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <span>Back</span>
              <ArrowLeft className="w-5 h-5" />
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
    </div>
  );
};

export default Flashcards;