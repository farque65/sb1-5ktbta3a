interface StreakData {
  count: number;
  lastLoginDate: string;
}

export const getStreak = (): number => {
  const streakData = localStorage.getItem('frenchLearningStreak');
  if (!streakData) {
    const initialStreak = { count: 1, lastLoginDate: new Date().toISOString() };
    localStorage.setItem('frenchLearningStreak', JSON.stringify(initialStreak));
    return 1;
  }

  const { count, lastLoginDate } = JSON.parse(streakData) as StreakData;
  const lastLogin = new Date(lastLoginDate);
  const today = new Date();
  
  // Reset hours, minutes, seconds and milliseconds for date comparison
  lastLogin.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffDays = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
  
  let newCount = count;
  if (diffDays === 1) {
    // Consecutive day, increment streak
    newCount = count + 1;
  } else if (diffDays > 1) {
    // Missed a day, reset streak
    newCount = 1;
  }
  // If diffDays === 0, same day, keep current streak
  
  const newStreakData = {
    count: newCount,
    lastLoginDate: new Date().toISOString()
  };
  
  localStorage.setItem('frenchLearningStreak', JSON.stringify(newStreakData));
  return newCount;
};