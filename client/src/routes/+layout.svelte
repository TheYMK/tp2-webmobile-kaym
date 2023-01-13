<script>
  import "../app.css";
	import { api } from '../api/Api'
	import userStore from '../stores/user'
	import { onMount } from 'svelte'
	import Navbar from '../lib/Navbar/index.svelte'
	import { SvelteToast } from '@zerodevx/svelte-toast'

	const setLoggedInUser = async () => {
		try {
			const res = await api.getCurrentuser()
			userStore.set(res.data)
		} catch (err) {
			userStore.set(null)
		}
	}

	const options = {
		duration: 10000,
		pausable: true
	}


	onMount(async () => {
		setLoggedInUser()
	})
</script>

<main>
	<div class="wrap">
		<SvelteToast {options} />
	</div>
	<Navbar />
	<slot />
</main>

<style>
  
	.wrap {
		--toastContainerTop: 0.5rem;
		--toastContainerRight: 0.5rem;
		--toastContainerBottom: auto;
		--toastContainerLeft: 0.5rem;
		--toastWidth: 100%;
		--toastMinHeight: 2rem;
		--toastPadding: 0 0.5rem;
		font-size: 0.875rem;
	}
	@media (min-width: 40rem) {
		.wrap {
			--toastContainerRight: auto;
			--toastContainerLeft: calc(50vw - 20rem);
			--toastWidth: 40rem;
		}
	}
</style>

<!-- markup (zero or more items) goes here -->