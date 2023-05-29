<script lang="ts">
  import Instructions from '../lib/instructions.svelte';
  import UserInput from '../lib/userInput.svelte';
  import ErrorModal from '../lib/error-modal.svelte';
  import { errorStore } from '../lib/stores';
  import type { Error } from '../lib/types';

  let error: Error;

  errorStore.subscribe((value) => {
    error = value;
  });
</script>

<div class="page">
  <div class="container">
    <div class="container-title">
      <img src="./images/logo.svg" alt="logo" />
      <h1>AInterview</h1>
    </div>
    <div class="container-content">
      <UserInput />
      <Instructions />
    </div>
  </div>
</div>
<!-- {#if error}
  <ErrorModal title={error.title} description={error.description} />
{/if} -->
<ErrorModal
  title="The provided URL is wrong"
  description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit urna in consectetur commodo. Sed vel ipsum ac elit fringilla semper sed nec eros. Morbi convallis malesuada diam, et aliquet ex ullamcorper sit amet.'}
/>

<style>
  .page {
    display: flex;
    justify-content: center;
  }

  .container-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacer-6);
    margin-top: var(--spacer-5);
  }

  .container-title img {
    height: 35px;
    width: 35px;
  }

  .container-title h1 {
    margin-left: var(--spacer-1);
    font-size: var(--font-size-title);
    color: var(--col-purple);
  }

  .container-content {
    display: flex;
    margin-top: var(--spacer-7);
  }

  @media only screen and (max-width: 1000px) {
    .container-content {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
