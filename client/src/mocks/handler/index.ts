import { authHandler } from './authHandler';
import { interviewHandler } from './interviewHandler';

export const handlers = [...authHandler, ...interviewHandler];
