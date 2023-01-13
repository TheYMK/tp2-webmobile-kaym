<script>
  import Menu from '../Dashboard/Menu/index.svelte'
  import navigationStore from '../../stores/navigation'
  import userStore from '../../stores/user'
	import AllDevices from './AllDevices.svelte';
	import MyProfile from './MyProfile.svelte';
	import AllUsers from './AllUsers.svelte';
	import AllAdmins from './AllAdmins.svelte';
	import Map from './Map.svelte';
  import { onMount } from "svelte";
	import { api } from "../../api/Api";
	import { notificationCenter } from "../../config/notification";
	import Overview from './Overview.svelte';


  $: if($userStore && $userStore.role === 'user') {
      navigationStore.set({active: "overview"})
  } else if($userStore && $userStore.role === 'admin') {
      navigationStore.set({active: "allUsers"})
  } else if($userStore && $userStore.role === 'superadmin') {
      navigationStore.set({active: "allAdmins"})
  }
</script>

<div class="flex flex-col md:flex-row">
  <Menu />
  <div class="md:ml-10 md:mt-14 mt-10 w-full px-2">
    {#if $navigationStore && $navigationStore.active === 'overview'}
       <Overview />
    {/if}
    {#if $navigationStore && $navigationStore.active === 'allDevices'}
       <AllDevices />
    {/if}
    {#if $navigationStore && $navigationStore.active === 'map'}
       <Map />
    {/if}
    {#if $navigationStore && $navigationStore.active === 'allUsers'}
       <AllUsers />
    {/if}
    {#if $navigationStore && $navigationStore.active === 'allAdmins'}
       <AllAdmins />
    {/if}
  </div>
</div>

<style>
  /* your styles go here */
</style>
