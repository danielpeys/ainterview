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

export type POSTEvalRequestBody = {
  question: string;
  answer: string;
};
