<script>
  // your script goes here
	import AuthGuard from "../lib/Guards/AuthGuard.svelte";
  import Dashboard from "../lib/Dashboard/index.svelte";
</script>

<AuthGuard>
  <Dashboard />
</AuthGuard>
<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->