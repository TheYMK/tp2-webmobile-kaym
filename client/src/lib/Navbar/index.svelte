<script>
	import { notificationCenter } from "../../config/notification";
	import { api } from "../../api/Api";
	import userStore from "../../stores/user";
  import { goto } from '$app/navigation'


  const onLogout = async () => {
    await api.signout();
    userStore.set(null)
    goto('/auth/login');
    notificationCenter.displaySuccessNotification('You are now logged out')

  }
</script>

<div class="navbar bg-base-100 shadow-lg">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-sm md:text-xl">Dashboard by Kaym Kassai</a>
  </div>
  <div class="flex-none hidden md:block">
    <ul class="menu menu-horizontal p-0">
      <li><a href="/">Dashboard</a></li>
      <li><a href="/map">Map</a></li>
      {#if $userStore && $userStore.username}
        <li><button on:click={onLogout}>Sign out</button></li>
      {:else}
        <li><a href="/auth/login">Sign in</a></li>
      {/if}
    </ul>
  </div>
</div>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->