import { Brain, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motivationalPhrases } from '../utils/motivationalPhrases';
import { getStreak } from '../utils/streak';

const Dashboard = () => {
  const [streak, setStreak] = useState(0);
  const [motivationalPhrase, setMotivationalPhrase] = useState('');

  useEffect(() => {
    setStreak(getStreak());
    setMotivationalPhrase(motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          French Learning Portal
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/flashcards">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1 group">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Brain className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Flashcards</h2>
                <p className="text-gray-600 text-center">
                  Practice French vocabulary with flashcards
                </p>
              </div>
            </div>
          </Link>

          <Link to="/quiz">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1 group">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <GraduationCap className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Quiz</h2>
                <p className="text-gray-600 text-center">
                  Test your knowledge with fun quizzes
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-400 rounded-lg p-6 inline-block max-w-2xl">
            <h3 className="text-xl font-semibold mb-2">Daily Streak: {streak} 🔥</h3>
            <p className="text-lg mt-4 italic">{motivationalPhrase}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;