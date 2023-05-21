import { OPENAI_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { POSTEvalSpeechRequestBody } from '../../../../lib/types.js';
import { Blob } from 'buffer';
import { getEvaluation } from '../../../../lib/utils.js';

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

  const requestBody = (await request.json()) as POSTEvalSpeechRequestBody;

  if (!requestBody || !requestBody.base64 || !requestBody.question) {
    throw error(400, {
      message: 'Request body is invalid',
    });
  }

  const answer = await getTextBySpeech(requestBody.base64);

  if (!answer) {
    throw error(500, {
      message: 'Audio processing failed',
    });
  }

  const evaluation = await getEvaluation(
    requestBody.question,
    answer,
    OPENAI_API_KEY
  );

  if (!evaluation) {
    throw error(500, {
      message: 'Generating evaluation failed',
    });
  }

  return new Response(evaluation);
}
