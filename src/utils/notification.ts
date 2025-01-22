import { motivationalPhrases } from './motivationalPhrases';

let cardCount = 0;
let quizCount = 0;

export const showMotivationalNotification = (type: 'card' | 'quiz') => {
  if (type === 'card') {
    cardCount++;
    if (cardCount % 5 === 0) {
      showNotification();
    }
  } else {
    quizCount++;
    if (quizCount % 5 === 0) {
      showNotification();
    }
  }
};

const showNotification = () => {
  const phrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
  
  // Create and show notification
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out';
  notification.style.zIndex = '1000';
  notification.textContent = phrase;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateY(-20px)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateY(100px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
};