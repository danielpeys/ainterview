<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="fullscreen-div" />
<div class="modal-container">
  <lottie-player
    src="https://assets10.lottiefiles.com/packages/lf20_bdnjxekx.json"
    background="transparent"
    speed="1.1"
    autoplay
  />
  <h3>{title}</h3>
  <p>{description}</p>
  <button class="btn">Close</button>
</div>

<style>
  lottie-player {
    width: 150px;
    height: 150px;
  }

  .modal-container {
    width: 400px;
    background-color: var(--col-white);
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  p {
    width: 80%;
    text-align: justify;
    margin-top: var(--spacer-2);
    margin-bottom: var(--spacer-2);
  }

  .btn {
    margin-bottom: var(--spacer-2);
    background-color: var(--col-purple);
    color: var(--col-white);
    padding: 10px 20px 10px 20px;
    border-radius: 5px;
    font-weight: bold;
  }

  .fullscreen-div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.448);
  }

  @media only screen and (max-width: 500px) {
    .modal-container {
      width: 350px;
    }
  }
</style>
