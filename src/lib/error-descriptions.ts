export const urlQuestionsError = new Map([
  [
    400,
    {
      title: 'The job description is not valid',
      description:
        'The job description was not valid. If you are certain that the provided URL contained a job description and this error persists, please copy-paste the job description and use the text input.',
    },
  ],
  [
    404,
    {
      title: 'The URL is not valid',
      description:
        'It appears that the provided website does not contain a job description. If you are certain that the provided URL should have a job description and this error persists, please copy-paste the job description and use the text input.',
    },
  ],
]);

export const textQuestionsError = new Map([
  [
    400,
    {
      title: 'The job description is not valid',
      description: 'Please ensure a valid job description is provided!',
    },
  ],
]);

export const textEvaluationError = new Map([
  [
    500,
    {
      title: 'Generating evaluation failed',
      description: 'Generating evaluation failed! Please try again.',
    },
  ],
]);

export const speechEvaluationError = new Map([
  [
    500,
    {
      title: 'Generating evaluation failed',
      description:
        'Generating evaluation failed! Please try again. If the error persists, please try it with the text input.',
    },
  ],
]);
