import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Bescherelle from './pages/Bescherelle';
import Dashboard from './pages/Dashboard';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import QuizReview from './pages/QuizReview';
import ReviewFlashcards from './pages/ReviewFlashcards';
import ReviewLists from './pages/ReviewLists';
import ReviewQuiz from './pages/ReviewQuiz';

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
        <Footer />
      </div>
    </Router>
  );
}

export default App;