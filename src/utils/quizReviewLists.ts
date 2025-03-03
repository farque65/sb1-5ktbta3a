import { QuizQuestion, QuizReviewList } from '../types';

const STORAGE_KEY = 'frenchLearningQuizReviewLists';

export const getQuizReviewLists = (): QuizReviewList[] => {
  const lists = localStorage.getItem(STORAGE_KEY);
  return lists ? JSON.parse(lists) : [];
};

export const saveQuizReviewLists = (lists: QuizReviewList[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
};

export const createQuizReviewList = (name: string): QuizReviewList => {
  return {
    id: crypto.randomUUID(),
    name,
    questions: [],
    createdAt: new Date().toISOString()
  };
};

export const addQuestionToList = (listId: string, question: QuizQuestion) => {
  const lists = getQuizReviewLists();
  const updatedLists = lists.map(list => {
    if (list.id === listId) {
      // Check if question already exists in the list
      const questionExists = list.questions.some(
        q => q.question === question.question
      );
      if (!questionExists) {
        return { ...list, questions: [...list.questions, question] };
      }
    }
    return list;
  });
  saveQuizReviewLists(updatedLists);
};

export const removeQuestionFromList = (listId: string, question: QuizQuestion) => {
  const lists = getQuizReviewLists();
  const updatedLists = lists.map(list => {
    if (list.id === listId) {
      return {
        ...list,
        questions: list.questions.filter(
          q => q.question !== question.question
        )
      };
    }
    return list;
  });
  saveQuizReviewLists(updatedLists);
};

export const deleteQuizReviewList = (listId: string) => {
  const lists = getQuizReviewLists();
  const updatedLists = lists.filter(list => list.id !== listId);
  saveQuizReviewLists(updatedLists);
};