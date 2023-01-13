<script>
	import LoadingToRedirect from '../ui/LoadingToRedirect.svelte'
	import userStore from '../../stores/user'

	let accessGranted = false

	$: if (($userStore && $userStore.role === 'user') || ($userStore && $userStore.role === 'admin') || ($userStore && $userStore.role === 'superadmin')) {
		console.log($userStore)
		accessGranted = true
	}
</script>

<div>
	{#if accessGranted}
		<slot />
	{:else}
		<LoadingToRedirect count={10} />
	{/if}
</div>

<!-- markup (zero or more items) goes here -->
<style>
</style>
