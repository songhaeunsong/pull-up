import { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent } from 'react';

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>;
export type SelectChangeEvent = ChangeEvent<HTMLSelectElement>;
export type FormFormEvent = FormEvent<HTMLFormElement>;
export type InputKeyboardEvent = KeyboardEvent<HTMLInputElement>;
export type TextAreaKeyboardEvent = KeyboardEvent<HTMLTextAreaElement>;
export type ButtonMouseEvent = MouseEvent<HTMLButtonElement>;
