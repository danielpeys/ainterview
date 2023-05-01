<script lang="ts">
  import Instructions from '../lib/instructions.svelte';
  import UserInput from '../lib/userInput.svelte';
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
  }
</style>
