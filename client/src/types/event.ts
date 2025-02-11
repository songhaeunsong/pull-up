import { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent } from 'react';

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type SelectChangeEvent = ChangeEvent<HTMLSelectElement>;
export type FormFormEvent = FormEvent<HTMLFormElement>;
export type InputKeyboardEvent = KeyboardEvent<HTMLInputElement>;
export type ButtonMouseEvent = MouseEvent<HTMLButtonElement>;
