export type GPTResponse = {
  id: string;
  object: string;
  created: number;
  choices: [
    {
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }
  ];
  usage: {
    prompt_tokens: string;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type POSTJobDescrRequestBody = {
  jobDescription: string;
};

export type POSTEvalTextRequestBody = {
  question: string;
  answer: string;
};

export type POSTEvalSpeechRequestBody = {
  question: string;
  base64: string;
};

export type QuestionsResponse = {
  title: string;
  questions: { question: string }[];
};

export type EvaluationResponse = {
  score: number;
  correct: boolean;
  positive: string;
  improvement: string;
};
