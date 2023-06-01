<script lang="ts">
  import ErrorModal from '../lib/error-modal.svelte';
  import { errorStore } from '../lib/stores';
  import type { Error } from '../lib/types';

  let error: Error;

  errorStore.subscribe((value) => {
    error = value;
  });
</script>

<slot />
{#if error}
  <ErrorModal title={error.title} description={error.description} />
{/if}
