import { authHandler } from './authHandler';
import { gameHandler } from './gameHandler';

export const handlers = [...authHandler, ...gameHandler];
