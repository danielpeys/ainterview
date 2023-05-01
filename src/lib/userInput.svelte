<script lang="ts">
  let isURLInput = true;
</script>

<div class="container">
  {#if isURLInput}
    <div class="h2-container">
      <h2>Provide the URL of the Job Description</h2>
    </div>
    <div class="url-input-group">
      <input type="text" />
      <button class="btn">START</button>
    </div>
  {:else}
    <div class="h2-container">
      <h2>Provide the Text of the Job Description</h2>
    </div>
    <div class="text-input-group">
      <textarea name="longText" rows="20" cols="80" />
      <button class="btn">START</button>
    </div>
  {/if}
  <button
    class="btn"
    on:click={() => {
      isURLInput = !isURLInput;
    }}>Swtich to {isURLInput ? 'text' : 'URL'}</button
  >
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

  .url-input-group input:focus,
  .text-input-group textarea:focus {
    outline: none;
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
    opacity: 0.9;
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
