import { authHandler } from './authHandler';
import { examHandler } from './examHandler';
import { interviewHandler } from './interviewHandler';
import { problemHandler } from './problemHandler';

export const handlers = [...authHandler, ...interviewHandler, ...examHandler, ...problemHandler];
