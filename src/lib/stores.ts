import { writable } from 'svelte/store';
import type { QuestionsResponse } from './types';

export const questionsStore = writable<QuestionsResponse>();
