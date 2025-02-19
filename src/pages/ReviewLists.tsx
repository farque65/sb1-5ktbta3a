import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ListChecks } from 'lucide-react';
import { ReviewList } from '../types';
import { getReviewLists } from '../utils/reviewLists';

const ReviewLists = () => {
  const [lists, setLists] = useState<ReviewList[]>([]);

  useEffect(() => {
    setLists(getReviewLists());
  }, []);

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
              <Link
                key={list.id}
                to={`/review/${list.id}`}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{list.name}</h2>
                    <p className="text-gray-600">{list.cards.length} cards</p>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{new Date(list.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewLists;