import { writable } from 'svelte/store';
import type { QuestionsResponse, Error } from './types';

export const questionsStore = writable<QuestionsResponse>();

export const errorStore = writable<Error>();
