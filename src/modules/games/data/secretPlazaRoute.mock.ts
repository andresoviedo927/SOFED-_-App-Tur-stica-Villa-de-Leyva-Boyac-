import TEXTS from '@/constants/texts';
import type { GameIntroduction } from '../types/game.types';

const routeTexts = TEXTS.games.secretPlazaRoute;

export const secretPlazaRouteMock: GameIntroduction = {
  id: 'secret-plaza-route',
  title: routeTexts.title,
  subtitle: routeTexts.subtitle,
  estimatedDuration: routeTexts.summary.duration,
  difficulty: routeTexts.summary.difficulty,
  totalPoints: 5,
  isSimulated: true,
  rewardDescription: routeTexts.rewardDescription,
  points: routeTexts.points.map((point, index) => ({
    id: `secret-plaza-point-${index + 1}`,
    order: index + 1,
    name: point.name,
    shortDescription: point.description,
  })),
};

export default secretPlazaRouteMock;
