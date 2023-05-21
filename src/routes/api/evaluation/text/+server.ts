import { OPENAI_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { POSTEvalTextRequestBody } from '../../../../lib/types.js';
import { getEvaluation } from '../../../../lib/utils.js';

export async function POST({ request }) {
  if (request.body === null) {
    throw error(400, {
      message: 'Request body is empty',
    });
  }

  const requestBody = (await request.json()) as POSTEvalTextRequestBody;

  if (!requestBody || !requestBody.answer || !requestBody.question) {
    throw error(400, {
      message: 'Request body is invalid',
    });
  }

  const evaluation = await getEvaluation(
    requestBody.question,
    requestBody.answer,
    OPENAI_API_KEY
  );

  if (!evaluation) {
    throw error(500, {
      message: 'Generating evaluation failed',
    });
  }

  return new Response(evaluation);
}
