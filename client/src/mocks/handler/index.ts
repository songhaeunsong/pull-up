import { authHandler } from './authHandler';
import { interviewHandler } from './interviewHandler';
import { problemHandler } from './problemHandler';
import { commentHandler } from './commentHandler';
import { gameHandler } from './gameHandler';

export const handlers = [...authHandler, ...interviewHandler, ...gameHandler];
