import { authHandler } from './authHandler';
import { interviewHandler } from './interviewHandler';
import { gameHandler } from './gameHandler';

export const handlers = [...authHandler, ...interviewHandler, ...gameHandler];
