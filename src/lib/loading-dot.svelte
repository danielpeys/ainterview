<script lang="ts">
  export let animate = false;
</script>

<svg height="50" width="50">
  <circle class="outline" cx="50%" cy="50%" r="11" class:animate />
  <circle class="circle" cx="50%" cy="50%" r="6.5" fill="white" />
</svg>

<style>
  .outline {
    fill: transparent;
    stroke: var(--col-white);
    stroke-width: 2.5px;
    stroke-dasharray: 471;
    stroke-dashoffset: 471;
    stroke-linecap: round;
  }

  .circle {
    fill: var(--col-white);
  }

  .animate {
    animation: clock-animation linear 1;
    animation-duration: 29991ms;
  }

  @keyframes clock-animation {
    from {
      stroke-dashoffset: 471;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
