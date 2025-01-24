import { authHandler } from './authHandler';
import { examHandler } from './examHandler';
import { interviewHandler } from './interviewHandler';

export const handlers = [...authHandler, ...interviewHandler, ...examHandler];
