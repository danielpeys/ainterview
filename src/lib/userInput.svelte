<script lang="ts">
  import { goto } from '$app/navigation';
  import { questionsStore, errorStore } from './stores';
  import {
    urlQuestionsError,
    textQuestionsError,
  } from '../lib/error-descriptions';
  import { handleError } from '../lib/utils';
  import CssLoader from './css-loader.svelte';

  let isURLInput = true;
  let isLoading = false;
  let url: string;
  let jobDescription: string;
  let validationMsg: string;

  function isValidURL(url: string) {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?([^\s.]+\.[^\s]{2,}|localhost|[\d]{1,3}(?:\.[\d]{1,3}){3})(?:\/[^\s]*)?$/;
    return (
      (regex.test(url) && url.includes('xing')) ||
      url.includes('linkedin') ||
      url.includes('stepstone')
    );
  }

  function resetPage() {
    isURLInput = true;
    isLoading = false;
    url = '';
    jobDescription = '';
    validationMsg = '';
  }

  async function startInterviewText() {
    if (!jobDescription) {
      validationMsg = 'Please enter a valid Job Description';
      return;
    }

    let result;
    isLoading = true;

    try {
      let response;

      response = await fetch('https://ainterview.netlify.app/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription: jobDescription }),
      });

      if (handleError(response, textQuestionsError, errorStore, [resetPage])) {
        return;
      }

      result = await response.json();
    } catch (error) {
      console.error('Error:', error);
      return;
    }
    $questionsStore = result;

    goto('/interview');
  }

  async function startInterviewURL() {
    if (!url || !isValidURL(url)) {
      validationMsg =
        'Please enter a valid URL. The app supports LinkedIn, Xing and Stepstone';
      return;
    }

    let result;
    isLoading = true;

    try {
      let response;
      response = await fetch(
        `https://ainterview.netlify.app/api/questions?url=${url}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (handleError(response, urlQuestionsError, errorStore, [resetPage])) {
        return;
      }

      result = await response.json();
    } catch (error) {
      console.error('Error:', error);
      return;
    }
    $questionsStore = result;

    goto('/interview');
  }
</script>

<div class="container">
  {#if isURLInput && !isLoading}
    <div class="h2-container">
      <h2>Provide the URL of the Job Description</h2>
    </div>
    <div class="url-input-group">
      <input
        type="text"
        bind:value={url}
        on:input={() => (validationMsg = '')}
      />
      <button class="btn" on:click={startInterviewURL}>START</button>
    </div>
  {:else if !isLoading}
    <div class="h2-container">
      <h2>Provide the Text of the Job Description</h2>
    </div>
    <div class="text-input-group">
      <textarea
        name="longText"
        rows="20"
        cols="80"
        bind:value={jobDescription}
        on:change={() => (validationMsg = '')}
        on:input={() => (validationMsg = '')}
      />
      <button class="btn" on:click={startInterviewText}>START</button>
    </div>
  {:else}
    <CssLoader />
  {/if}
  {#if !isLoading}
    {#if validationMsg}
      <p>{validationMsg}</p>
    {/if}
    <button
      class="btn"
      on:click={() => {
        jobDescription = '';
        url = '';
        validationMsg = '';
        isURLInput = !isURLInput;
      }}>Swtich to {isURLInput ? 'text' : 'URL'}</button
    >
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    min-width: 500px;
    margin-right: var(--spacer-5);
    margin: auto;
  }

  .h2-container {
    width: fit-content;
    margin: 0 auto 50px;
  }

  h2 {
    color: var(--col-purple);
    overflow: hidden;
    border-right: 0.15em solid var(--col-green);
    white-space: nowrap;
    animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: var(--col-green);
    }
  }

  .url-input-group {
    display: flex;
    position: relative;
  }

  .url-input-group input,
  .text-input-group textarea {
    border: solid var(--col-purple);
    color: var(--col-purple);
    border-radius: 5px;
  }

  .url-input-group input {
    line-height: var(--spacer-3);
    font-size: var(--font-size-xxl);
    width: 500px;
    border-width: 2.2px;
  }

  .url-input-group button {
    position: absolute;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: var(--col-purple);
    color: var(--col-white);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .url-input-group button:hover {
    background-color: var(--col-blue);
    transition: 0.25s ease-out;
  }

  .text-input-group {
    display: flex;
    flex-direction: column;
    align-items: end;
    position: relative;
  }

  .text-input-group textarea {
    resize: none;
    padding: var(--spacer-1);
    border-width: 3px;
  }

  .text-input-group button {
    margin-top: var(--spacer-1);
    color: var(--col-purple);
  }

  .container > button {
    color: var(--col-blue);
    margin-top: var(--spacer-1);
  }

  .container > button:hover,
  .text-input-group button:hover {
    transform: scale(1.02);
    transition: 0.1s linear;
  }

  .container > p {
    color: var(--col-red);
    font-size: var(--font-size-xs);
    margin-top: var(--spacer-1);
  }

  @media only screen and (max-width: 1000px) {
    .container {
      margin-top: var(--spacer-6);
    }

    .text-input-group {
      width: 100%;
    }
    .text-input-group textarea {
      width: 500px;
      margin: auto;
    }
  }

  @media only screen and (max-width: 550px) {
    .container {
      align-items: center;
    }
    .url-input-group input {
      width: 400px;
    }

    .text-input-group {
      width: 350px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .text-input-group textarea {
      width: 350px;
    }
  }

  @media only screen and (max-width: 480px) {
    .url-input-group input {
      width: 350px;
    }

    .h2-container {
      margin-bottom: 30px;
    }

    h2 {
      font-size: var(--font-size-small);
    }
  }
</style>
