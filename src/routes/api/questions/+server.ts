import * as cheerio from 'cheerio';
import { OPENAI_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { GPTResponse, POSTRequestBody } from '../../../lib/types.js';

async function getWebsiteData(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function getQuestions(jobDescription: string) {
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
        content: `Write 10 interview questions for this job description ${jobDescription}`,
      },
    ],
  });

  const response = await fetch(url, { method: 'POST', headers, body });
  const data = (await response.json()) as GPTResponse;

  return data.choices[0].message.content;
}

export async function GET({ url }) {
  const scrapURL = url.searchParams.get('url');
  if (!scrapURL) {
    throw error(400, {
      message: 'URL is missing',
    });
  }

  const websiteData = await getWebsiteData(scrapURL);
  if (!websiteData) {
    throw error(404, {
      message: 'Website not found',
    });
  }

  const $ = cheerio.load(websiteData);
  const jobDescription = $('main').text().trim();

  if (!jobDescription) {
    throw error(404, {
      message: 'Content not found',
    });
  }

  const questions = await getQuestions(jobDescription);

  if (!questions) {
    throw error(500, {
      message: 'Generating questions failed',
    });
  }

  return new Response(questions);
}

export async function POST({ request }) {
  if (request.body === null) {
    throw error(400, {
      message: 'Request body is empty',
    });
  }

  const jobDescription = ((await request.json()) as POSTRequestBody)
    .jobDescription;

  if (!jobDescription) {
    throw error(400, {
      message: 'Request body is invalid',
    });
  }

  const questions = await getQuestions(jobDescription);

  if (!questions) {
    throw error(500, {
      message: 'Generating questions failed',
    });
  }

  return new Response(questions);
}
