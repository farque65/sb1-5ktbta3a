import { Clock, ListChecks, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReviewList } from '../types';
import { deleteReviewList, getReviewLists } from '../utils/reviewLists';

const ReviewLists = () => {
  const [lists, setLists] = useState<ReviewList[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLists(getReviewLists());
  }, []);

  const handleDeleteList = (listId: string) => {
    deleteReviewList(listId);
    setLists(getReviewLists());
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Flashcards Review</h1>

        <div className="max-w-2xl mx-auto grid gap-4">
          {lists.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <ListChecks className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No review lists yet</h2>
              <p className="text-gray-600 mb-4">
                Create your first review list by adding cards while practicing flashcards
              </p>
              <Link
                to="/flashcards"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Flashcards
              </Link>
            </div>
          ) : (
            lists.map((list) => (
              <div key={list.id} className="relative bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                {showDeleteConfirm === list.id ? (
                  <div className="absolute inset-0 bg-white rounded-lg p-6 flex flex-row items-center justify-center">
                    <p className="text-gray-800 mx-4">Are you sure you want to delete this list?</p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleDeleteList(list.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div className="cursor-pointer" onClick={() => navigate(`/review/${list.id}`)}>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{list.name}</h2>
                        <p className="text-gray-600">{list.cards.length} cards</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{new Date(list.createdAt).toLocaleDateString()}</span>
                        </div>
                        <button
                          onClick={() => setShowDeleteConfirm(list.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete list"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewLists;