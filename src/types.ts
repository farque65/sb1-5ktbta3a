export interface FlashCard {
  french: string;
  english: string;
}

export interface QuizQuestion {
  info?:string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ReviewList {
  id: string;
  name: string;
  cards: FlashCard[];
  createdAt: string;
}

export interface QuizReviewList {
  id: string;
  name: string;
  questions: QuizQuestion[];
  createdAt: string;
}

export interface ReviewListsState {
  lists: ReviewList[];
}

export interface QuizReviewListsState {
  lists: QuizReviewList[];
}