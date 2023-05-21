import { OPENAI_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { GPTResponse, POSTEvalRequestBody } from '../../../lib/types.js';
import { Blob } from 'buffer';

async function getEvaluation(question: string, answer: string) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY}`,
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

async function getTextBySpeech(base64String: string) {
  const file = base64ToBlob(base64String);
  const formData = new FormData();
  // @ts-ignore
  formData.append('file', file, 'recording.mp3');
  formData.append('model', 'whisper-1');

  const url = 'https://api.openai.com/v1/audio/transcriptions';
  const headers = {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };
  const body = formData;

  const response = await fetch(url, { method: 'POST', headers, body });
  const data = (await response.json()) as { text: string };

  return data.text;
}

function base64ToBlob(base64String: string) {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: 'audio/mp3' });
  return blob;
}

export async function POST({ request }) {
  if (request.body === null) {
    throw error(400, {
      message: 'Request body is empty',
    });
  }

  const requestBody = (await request.json()) as { blob: string };

  const evaluation = await getTextBySpeech(requestBody.blob);

  if (!evaluation) {
    throw error(500, {
      message: 'Generating evaluation failed',
    });
  }
  console.log(evaluation);
  return new Response(evaluation);
}

/* export async function POST({ request }) {
  if (request.body === null) {
    throw error(400, {
      message: 'Request body is empty',
    });
  }

  const requestBody = (await request.json()) as POSTEvalRequestBody;

  if (!requestBody || !requestBody.answer || !requestBody.question) {
    throw error(400, {
      message: 'Request body is invalid',
    });
  }

  const evaluation = await getEvaluation(
    requestBody.question,
    requestBody.answer
  );

  if (!evaluation) {
    throw error(500, {
      message: 'Generating evaluation failed',
    });
  }

  return new Response(evaluation);
}
 */
