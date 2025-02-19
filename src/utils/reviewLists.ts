import { ReviewList, FlashCard } from '../types';

const STORAGE_KEY = 'frenchLearningReviewLists';

export const getReviewLists = (): ReviewList[] => {
  const lists = localStorage.getItem(STORAGE_KEY);
  return lists ? JSON.parse(lists) : [];
};

export const saveReviewLists = (lists: ReviewList[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
};

export const createReviewList = (name: string): ReviewList => {
  return {
    id: crypto.randomUUID(),
    name,
    cards: [],
    createdAt: new Date().toISOString()
  };
};

export const addCardToList = (listId: string, card: FlashCard) => {
  const lists = getReviewLists();
  const updatedLists = lists.map(list => {
    if (list.id === listId) {
      // Check if card already exists in the list
      const cardExists = list.cards.some(
        c => c.french === card.french && c.english === card.english
      );
      if (!cardExists) {
        return { ...list, cards: [...list.cards, card] };
      }
    }
    return list;
  });
  saveReviewLists(updatedLists);
};

export const removeCardFromList = (listId: string, card: FlashCard) => {
  const lists = getReviewLists();
  const updatedLists = lists.map(list => {
    if (list.id === listId) {
      return {
        ...list,
        cards: list.cards.filter(
          c => c.french !== card.french || c.english !== card.english
        )
      };
    }
    return list;
  });
  saveReviewLists(updatedLists);
};