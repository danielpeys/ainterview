<script lang="ts">
  import { scale } from 'svelte/transition';
  import { questionsStore } from '../../lib/stores';

  let isAnswering = false;

  questionsStore.subscribe((value) => {
    console.log(value.questions);
  });
</script>

<div class="page">
  <div class="container">
    <h1>
      Can you describe your experience with software architecture design
      principles and methodologies?
    </h1>

    {#if isAnswering}
      <textarea cols="50" rows="10" transition:scale={{ duration: 700 }} />
      <button
        class="btn answer-btn"
        on:click={() => (isAnswering = !isAnswering)}>Submit</button
      >
    {:else}
      <button
        class="btn answer-btn"
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
  }

  /*   solid var(--col-purple) 1.5px; */

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

  .answer-btn {
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

  .answer-btn:hover {
    transition: 0.25s;
    transform: scale(1.1);
  }
</style>
