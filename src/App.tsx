import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import ReviewLists from './pages/ReviewLists';
import ReviewFlashcards from './pages/ReviewFlashcards';
import QuizReview from './pages/QuizReview';
import ReviewQuiz from './pages/ReviewQuiz';
import Bescherelle from './pages/Bescherelle';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/review" element={<ReviewLists />} />
          <Route path="/review/:listId" element={<ReviewFlashcards />} />
          <Route path="/quiz-review" element={<QuizReview />} />
          <Route path="/quiz-review/:listId" element={<ReviewQuiz />} />
          <Route path="/bescherelle" element={<Bescherelle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;