import React, { useState, useEffect } from 'react';
import { FlashCard, ReviewList } from '../types';
import { getReviewLists, saveReviewLists, createReviewList, addCardToList, removeCardFromList } from '../utils/reviewLists';
import { Plus, X, Check, Minus } from 'lucide-react';

interface AddToListModalProps {
  card: FlashCard;
  currentListId?: string;
  onClose: () => void;
}

const AddToListModal: React.FC<AddToListModalProps> = ({ card, currentListId, onClose }) => {
  const [lists, setLists] = useState<ReviewList[]>(getReviewLists());
  const [newListName, setNewListName] = useState('');
  const [showNewListInput, setShowNewListInput] = useState(false);

  const handleCreateList = () => {
    if (newListName.trim()) {
      const newList = createReviewList(newListName.trim());
      const updatedLists = [...lists, newList];
      setLists(updatedLists);
      saveReviewLists(updatedLists);
      addCardToList(newList.id, card);
      setNewListName('');
      setShowNewListInput(false);
    }
  };

  const handleToggleCard = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    if (!list) return;

    const cardExists = list.cards.some(
      c => c.french === card.french && c.english === card.english
    );

    if (cardExists) {
      removeCardFromList(listId, card);
    } else {
      addCardToList(listId, card);
    }

    setLists(getReviewLists());
  };

  const isCardInList = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    return list?.cards.some(
      c => c.french === card.french && c.english === card.english
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add to Review List</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {showNewListInput ? (
          <div className="mb-4">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleCreateList}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
              <button
                onClick={() => setShowNewListInput(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowNewListInput(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <Plus size={20} />
            <span>Create new list</span>
          </button>
        )}

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {lists.map((list) => (
            <button
              key={list.id}
              onClick={() => handleToggleCard(list.id)}
              disabled={list.id === currentListId}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                list.id === currentListId
                  ? 'bg-gray-100 cursor-not-allowed'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{list.name}</div>
                  <div className="text-sm text-gray-500">{list.cards.length} cards</div>
                </div>
                {list.id !== currentListId && (
                  <div className="text-blue-600">
                    {isCardInList(list.id) ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddToListModal