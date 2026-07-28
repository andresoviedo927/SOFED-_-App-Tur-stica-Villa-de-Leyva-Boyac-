import { useState } from 'react';
import { getTriviaQuestions } from '../services/gamesService';
import { GameTrivia } from '../types';

export const useGames = () => {
  const [questions] = useState<GameTrivia[]>(getTriviaQuestions());
  return { questions };
};

export default useGames;
