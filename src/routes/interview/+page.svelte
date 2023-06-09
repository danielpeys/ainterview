<script lang="ts">
  import { scale } from 'svelte/transition';
  import { errorStore, questionsStore } from '../../lib/stores';
  import type { EvaluationResponse } from '$lib/types';
  import CssLoader from '../../lib/css-loader.svelte';
  import { onMount } from 'svelte';
  import { handleError } from '../../lib/utils';
  import {
    speechEvaluationError,
    textEvaluationError,
  } from '$lib/error-descriptions';
  import { PUBLIC_URL } from '$env/static/public';

  let isLoading = false;
  let isAnsweringWithText = false;
  let isAnsweringWithSpeech = false;
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

  let media: BlobPart[] | undefined = [];
  let mediaRecorder: MediaRecorder | null = null;
  let isRecording = false;
  let hasRecorded = false;
  let base64: string;

  questionsStore.subscribe((value) => {
    if (value) {
      questions = value.questions;
    }
  });

  onMount(() => {
    if (!questions) {
      window.location.href = './';
    }
  });

  onMount(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => media?.push(e.data);
    mediaRecorder.onstop = async function () {
      const audioElement = document.querySelector('audio');
      const blob = new Blob(media, { type: 'audio/mp3; codecs=opus' });
      media = [];

      if (audioElement) {
        audioElement.src = window.URL.createObjectURL(blob);
      }

      base64 = await blobToBase64(blob);
    };
  });

  async function blobToBase64(blob: Blob): Promise<string> {
    const base64String = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    return (base64String as string).split(',')[1];
  }

  function setResult(result: EvaluationResponse) {
    score = result.score;
    answerIsCorrect = result.correct;
    positiveFeedback = result.positive;
    improvementSuggestion = result.improvement;
    isLoading = false;
    gotAnswer = true;
  }

  async function getEvaluationBySpeech(question: string, base64: string) {
    isLoading = true;
    try {
      let response = await fetch(`${PUBLIC_URL}/api/evaluation/speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          base64,
        }),
      });

      if (handleError(response, speechEvaluationError, errorStore, [])) {
        return;
      }

      let result = (await response.json()) as EvaluationResponse;
      setResult(result);
      isAnsweringWithSpeech = false;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function getEvaluationByText(question: string, answer: string) {
    isLoading = true;
    try {
      let response = await fetch(`${PUBLIC_URL}/api/evaluation/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
        }),
      });

      if (handleError(response, textEvaluationError, errorStore, [])) {
        return;
      }

      let result = (await response.json()) as EvaluationResponse;
      setResult(result);
      isAnsweringWithText = false;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function reset() {
    isAnsweringWithText = false;
    isAnsweringWithSpeech = false;
    gotAnswer = false;
    isRecording = false;
    hasRecorded = false;
    answer = '';
  }

  function nextQuestion() {
    if (progressCount === questions.length - 1) window.location.href = './';
    reset();
    progressCount += 1;
  }
</script>

<div class="page">
  <div class="container">
    <h1>
      {isLoading
        ? 'The answer is being evaluated...'
        : gotAnswer
        ? 'Your evaluation'
        : questions
        ? questions[progressCount].question
        : ''}
    </h1>

    {#if isLoading}
      <CssLoader />
      <div class="loading-space" />
    {:else if gotAnswer}
      <div class="stats">
        <p>{score}/10</p>
        <p>
          {answerIsCorrect && score > 2
            ? 'The answer was correct'
            : 'The answer was not correct'}
        </p>
        <p>{answerIsCorrect && score > 2 ? '🥳' : '😞'}</p>
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
          >{progressCount === questions.length - 1
            ? 'End Interview'
            : 'Next question'}</button
        >
      </div>
    {:else if isAnsweringWithText}
      <textarea
        cols="50"
        rows="10"
        in:scale={{ duration: 700 }}
        bind:value={answer}
      />
      <div class="question-control-btns">
        <button class="btn primary-btn back-btn" on:click={reset}
          ><img src="./images/back-icon.svg" alt="Go back" /></button
        >
        <button
          class="btn primary-btn"
          on:click={() =>
            getEvaluationByText(questions[progressCount].question, answer)}
          >Submit</button
        >
      </div>
    {:else if isAnsweringWithSpeech}
      {#if hasRecorded}
        <audio controls>
          Your browser does not support the audio element.
        </audio>
      {/if}
      {#if isRecording}
        <lottie-player
          src="https://assets3.lottiefiles.com/packages/lf20_pzrstZ.json"
          background="transparent"
          speed="1"
          style="width: 150px; height: 150px;"
          loop
          autoplay
        />
      {/if}
      <div class="question-control-btns">
        <button class="btn primary-btn back-btn" on:click={reset}
          ><img src="./images/back-icon.svg" alt="Go back" /></button
        >
        <div class="audio-control-buttons">
          <button
            class="btn primary-btn"
            class:hide-btn={isRecording || hasRecorded}
            on:click={() => {
              isRecording = true;
              if (mediaRecorder) mediaRecorder.start();
            }}>Start Recording</button
          >
          <button
            class="btn primary-btn"
            class:hide-btn={!isRecording || hasRecorded}
            on:click={() => {
              isRecording = false;
              hasRecorded = true;
              if (mediaRecorder) mediaRecorder.stop();
            }}>Stop Recording</button
          >
          <button
            class="btn primary-btn"
            class:hide-btn={!hasRecorded}
            on:click={() => {
              isRecording = false;
              hasRecorded = false;
              base64 = '';
              media = [];
            }}
          >
            <img src="./images/retry-icon.svg" alt="retry" />
          </button>
          <button
            class="btn primary-btn"
            class:hide-btn={!hasRecorded}
            on:click={() =>
              getEvaluationBySpeech(questions[progressCount].question, base64)}
            >Submit</button
          >
        </div>
      </div>
    {:else}
      <div class="question-control-btns">
        <button
          class="btn primary-btn"
          on:click={() => (isAnsweringWithText = true)}>Answer with text</button
        >
        <button
          class="btn primary-btn"
          on:click={() => (isAnsweringWithSpeech = true)}
          >Answer with speech</button
        >
      </div>
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

  .audio-control-buttons {
    display: flex;
  }

  .audio-control-buttons .btn:nth-child(3) {
    margin-right: var(--spacer-1);
  }

  .loading-space {
    margin-bottom: var(--spacer-4);
  }

  .back-btn {
    padding-left: var(--spacer-2);
    padding-right: var(--spacer-2);
  }

  .hide-btn {
    display: none;
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

  @media only screen and (max-width: 480px) {
    .container h1 {
      margin-top: var(--spacer-2);
      margin-bottom: unset;
    }

    .question-control-btns > button {
      font-size: var(--font-size-xxs);
      padding: 15px 20px 15px 20px;
    }

    .question-control-btns {
      width: 90%;
    }

    .primary-btn {
      margin-top: var(--spacer-3);
      margin-bottom: var(--spacer-3);
    }

    .question-control-btns:has(.audio-control-buttons) button,
    .question-control-btns:has(img) button {
      padding: 5px 10px 5px 10px;
    }

    audio {
      margin-top: var(--spacer-3);
      width: 200px;
      height: 45px;
    }

    textarea {
      margin-top: var(--spacer-3);
    }

    .stats p {
      margin-top: var(--spacer-2);
    }

    .positive-feedback-container {
      margin-top: var(--spacer-2);
    }
  }
</style>
