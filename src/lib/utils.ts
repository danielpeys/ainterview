import type { Writable } from 'svelte/store';
import type { Error, GPTResponse } from './types.js';

export async function getEvaluation(
  question: string,
  answer: string,
  apiKey: string
) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };
  const body = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `We are in an Job Interview and I got the question: "${question}". My answer was: "${answer}". Please evaluate the answer in this JSON format: score: Give the answer a score from 0 - 10, correct: Was the answer correct (If yes answer just true, if no say why), positive: What was good about the answer in 1 - 5 sentences, improvement: What can be improved in 1 to 5 sentences`,
      },
    ],
  });

  const response = await fetch(url, { method: 'POST', headers, body });
  const data = (await response.json()) as GPTResponse;

  return data.choices[0].message.content;
}

export function handleError(
  response: Response,
  errorDescriptions: Map<number, Error>,
  errorStore: Writable<Error>,
  sideEffects: Function[]
) {
  if (!response.ok) {
    let error = errorDescriptions.get(response.status) || {
      title: 'Generating Questions Failed',
      description: 'Generating the questions failed. Please try again later!',
    };

    errorStore.set(error);
    sideEffects.forEach((effect) => effect());
    return true;
  }
  return false;
}
