import { authHandler } from './authHandler';
import { interviewHandler } from './interviewHandler';
import { commentHandler } from './commentHandler';

export const handlers = [...authHandler, ...interviewHandler, ...commentHandler];
