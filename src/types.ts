export interface FlashCard {
  french: string;
  english: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}