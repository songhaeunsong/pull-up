import { authHandler } from './authHandler';
import { examHandler } from './examHandler';
import { interviewHandler } from './interviewHandler';
import { gameHandler } from './gameHandler';
import { memberHandler } from './memberHandler';
import { problemHandler } from './problemHandler';
import { commentHandler } from './commentHandler';

export const handlers = [
  ...authHandler,
  ...interviewHandler,
  ...commentHandler,
  ...examHandler,
  ...problemHandler,
  ...gameHandler,
  ...memberHandler,
];
