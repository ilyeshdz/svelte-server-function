<script lang="ts">
  import { getUser } from "$lib/server/get-user";
  import { getSession } from "$lib/server/get-session";

  const { isPending, data, error } = getUser();
  const { isPending: sessionPending, data: sessionData, error: sessionError } = getSession();

  data.subscribe((data) => {
    console.log("Data updated: ", data);
  });

  sessionData.subscribe((data) => {
    console.log("Session data updated: ", data);
  });
</script>

{#if $isPending || $sessionPending}
  Loading...
{:else if $error || $sessionError}
  Error: {$error.message}
{/if}
