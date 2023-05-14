<script lang="ts">
  import { scale } from 'svelte/transition';
  import { questionsStore } from '../../lib/stores';
  import type { EvaluationResponse } from '$lib/types';

  let isAnswering = false;
  let gotAnswer = false;
  let questions: {
    question: string;
  }[];
  let progressCount = 0;
  let answer: string;
  let score: number;
  let answerIsCorrect: boolean;
  let positiveFeedback: string;
  let improvementSuggestion: string;

  questionsStore.subscribe((value) => {
    questions = value.questions;
  });

  async function getEvaluation(question: string, answer: string) {
    try {
      let response;
      response = await fetch(`http://127.0.0.1:5173/api/evaluation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let result = (await response.json()) as EvaluationResponse;
      score = result.score;
      answerIsCorrect = result.correct;
      positiveFeedback = result.positive;
      improvementSuggestion = result.improvement;

      isAnswering = false;
      gotAnswer = true;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function reset() {
    isAnswering = true;
    gotAnswer = false;
    answer = '';
  }

  function nextQuestion() {
    reset();
    if (progressCount < questions.length) progressCount += 1;
  }
</script>

<div class="page">
  <div class="container">
    <h1>
      {questions[progressCount].question}
    </h1>

    {#if gotAnswer}
      <div class="stats">
        <p>{score}/10</p>
        <p>
          {answerIsCorrect
            ? 'The answer was correct'
            : 'The answer was not correct'}
        </p>
        <p>{answerIsCorrect ? '🥳' : '😞'}</p>
      </div>
      <div class="positive-feedback-container">
        <h3>What was good:</h3>
        <p>{positiveFeedback}</p>
      </div>
      <div class="improvement-container">
        <h3>What can be improved</h3>
        <p>{improvementSuggestion}</p>
      </div>
      <div class="question-control-btns">
        <button class="btn primary-btn" on:click={reset}>Try again</button>
        <button class="btn primary-btn" on:click={nextQuestion}
          >Next question</button
        >
      </div>
    {:else if isAnswering}
      <textarea
        cols="50"
        rows="10"
        in:scale={{ duration: 700 }}
        bind:value={answer}
      />
      <button
        class="btn primary-btn"
        on:click={() =>
          getEvaluation(questions[progressCount].question, answer)}
        >Submit</button
      >
    {:else}
      <button
        class="btn primary-btn"
        on:click={() => (isAnswering = !isAnswering)}>Answer</button
      >
    {/if}
  </div>
</div>

<style>
  .page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    width: 60%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container h1 {
    font-size: var(--font-size-xxl);
    color: var(--col-purple);
    text-align: center;
    margin-top: var(--spacer-5);
    margin-left: var(--spacer-2);
    margin-right: var(--spacer-2);
    margin-bottom: var(--spacer-4);
  }

  textarea {
    resize: none;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #6435ef15;
    padding: var(--spacer-1);
    color: var(--col-purple);
    border-radius: 5px;
    margin-top: var(--spacer-5);
    width: 80%;
  }

  .primary-btn {
    background-color: var(--col-purple);
    color: white;
    padding: 15px 10px 15px 10px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 10px;
    margin-top: var(--spacer-5);
    margin-bottom: var(--spacer-5);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .primary-btn:hover {
    transition: 0.25s;
    transform: scale(1.1);
  }

  .stats {
    display: flex;
    align-items: center;
    font-size: var(--font-size-large);
    position: relative;
    color: var(--col-green);
    font-weight: bold;
  }

  .stats p:first-child {
    margin-right: var(--spacer-1);
  }

  .stats p:last-child {
    margin-left: var(--spacer-1);
  }

  .positive-feedback-container,
  .improvement-container {
    width: 80%;
    margin-top: var(--spacer-5);
  }

  .positive-feedback-container h3,
  .improvement-container h3 {
    color: var(--col-purple);
    font-size: var(--font-size-large);
    margin-bottom: var(--spacer-1);
  }

  .positive-feedback-container p,
  .improvement-container p {
    color: var(--col-gray);
  }

  .improvement-container {
    margin-bottom: var(--spacer-1);
  }

  .question-control-btns {
    display: flex;
    justify-content: space-around;
    width: 65%;
  }

  @media only screen and (max-width: 1200px) {
    .container {
      width: 90%;
    }
    .container h1 {
      font-size: var(--font-size-xl);
      width: 90%;
      margin: 0;
      margin-top: var(--spacer-2);
      margin-bottom: var(--spacer-2);
    }

    .positive-feedback-container,
    .improvement-container {
      margin-top: var(--spacer-4);
    }

    .question-control-btns {
      width: 65%;
    }
  }

  @media only screen and (max-width: 1000px) {
    .container h1 {
      font-size: var(--font-size-large);
      width: 90%;
      margin: 0;
      margin-top: var(--spacer-2);
      margin-bottom: var(--spacer-2);
    }

    .positive-feedback-container h3,
    .improvement-container h3,
    .stats p {
      font-size: var(--font-size-medium);
    }

    .stats p {
      margin-top: var(--spacer-1);
    }
  }

  @media only screen and (max-width: 900px) {
    .container h1 {
      font-size: var(--font-size-medium);
      width: 90%;
      margin: 0;
      margin-top: var(--spacer-2);
      margin-bottom: var(--spacer-2);
    }

    .positive-feedback-container h3,
    .improvement-container h3,
    .stats p {
      font-size: var(--font-size-small);
    }

    .positive-feedback-container p,
    .improvement-container p {
      font-size: var(--font-size-xs);
    }

    .question-control-btns button {
      font-size: var(--font-size-xxs);
      padding: 12px;
    }
  }
</style>
