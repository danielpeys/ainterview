<script lang="ts">
  import LoadingDot from './loading-dot.svelte';

  let count = 0;
  let timer = setInterval(incrementCounter, 4250);

  function incrementCounter() {
    if (count < 4) {
      count++;
    } else {
      count = 0;
    }
  }

  function setCounter(counter: number) {
    clearInterval(timer);
    count = counter;
    timer = setInterval(incrementCounter, 4000);
  }
</script>

<div class="container">
  <h1>HOW TO PREPARE FOR YOUR INTERVIEW</h1>
  <div class="how-to-container">
    {#if count === 0}
      <div class="how-to-section">
        <lord-icon
          src="https://cdn.lordicon.com/edxgdhxu.json"
          trigger="loop"
          delay="150"
          colors="primary:#ffffff,secondary:#ffffff"
          style="width:150px;height:150px"
        />
        <div class="how-to-text">
          <h2>SET UP YOUR INTERVIEW</h2>
          <p>Provide a URL or a Text which contains your job discription</p>
        </div>
      </div>
    {:else if count === 1}
      <div class="how-to-section">
        <lord-icon
          src="https://cdn.lordicon.com/wxnxiano.json"
          trigger="loop"
          delay="150"
          colors="primary:#ffffff,secondary:#ffffff"
          style="width:150px;height:150px"
        />
        <div class="how-to-text">
          <h2>READ THE QUESTION</h2>
          <p>Your artifical interviewer will ask you questions</p>
        </div>
      </div>
    {:else if count === 2}
      <div class="how-to-section">
        <lord-icon
          src="https://cdn.lordicon.com/zpxybbhl.json"
          trigger="loop"
          delay="150"
          colors="primary:#ffffff,secondary:#ffffff"
          style="width:150px;height:150px"
        />
        <div class="how-to-text">
          <h2>ANSWER THE QUESTION</h2>
          <p>Answer the question by voice or text</p>
        </div>
      </div>
    {:else if count === 3}
      <div class="how-to-section">
        <lord-icon
          src="https://cdn.lordicon.com/imamsnbq.json"
          trigger="loop"
          delay="150"
          colors="primary:#ffffff,secondary:#ffffff"
          style="width:150px;height:150px"
        />
        <div class="how-to-text">
          <h2>GET YOUR EVALUATION</h2>
          <p>Your artificial interviewer will evaluate your answer</p>
        </div>
      </div>
    {:else}
      <div class="how-to-section">
        <lord-icon
          src="https://cdn.lordicon.com/lupuorrc.json"
          trigger="loop"
          delay="150"
          colors="primary:#ffffff,secondary:#ffffff"
          style="width:150px;height:150px"
        />
      </div>
      <div class="how-to-text">
        <h2>Ace your interview</h2>
        <p>Learn, repeat and ace your real interview</p>
      </div>
    {/if}
  </div>
  <div class="loading-dots">
    <button class="btn" on:click={() => setCounter(0)}>
      <LoadingDot animate={count === 0} />
    </button>
    <button class="btn" on:click={() => setCounter(1)}>
      <LoadingDot animate={count === 1} />
    </button>
    <button class="btn" on:click={() => setCounter(2)}>
      <LoadingDot animate={count === 2} />
    </button>
    <button class="btn" on:click={() => setCounter(3)}>
      <LoadingDot animate={count === 3} />
    </button>
    <button class="btn" on:click={() => setCounter(4)}>
      <LoadingDot animate={count === 4} />
    </button>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 50px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    border-radius: 10px;
    width: 380px;
    background-color: var(--col-purple);
  }

  h1,
  .how-to-text {
    color: var(--col-white);
  }

  h1 {
    margin-bottom: 15px;
    padding-top: 20px;
    font-size: var(--font-size-large);
    text-align: center;
  }

  .how-to-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .how-to-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 10px;
  }

  .how-to-text p {
    margin-top: 10px;
    width: 80%;
    font-size: var(--font-size-medium);
  }

  .loading-dots {
    display: flex;
    padding-top: 25px;
    padding-bottom: 10px;
  }

  .btn {
    margin-left: 5px;
  }

  @media only screen and (max-width: 970px) {
    .container {
      margin-left: 0px;
      margin-top: 50px;
      width: 300px;
    }
  }
</style>
