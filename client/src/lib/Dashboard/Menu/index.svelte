<script>
  	import userStore from '../../../stores/user'
    import navigationStore from '../../../stores/navigation'


    const switchMenu = (path) => {
      navigationStore.set({active: path})
    }

</script>
<ul class="menu menu-vertical bg-primary text-white w-56 h-screen hidden md:block">
  {#if $userStore && $userStore.role === 'user'}
    <li on:click={() => switchMenu("overview")} class={$navigationStore && $navigationStore.active === 'overview' ? 'bg-blue-400' : ''}><a><i class="fa-solid fa-eye"></i> Overview</a></li>
    <li on:click={() => switchMenu("allDevices")} class={$navigationStore && $navigationStore.active === 'allDevices' ? 'bg-blue-400' : ''}><a><i class="fa-solid fa-server"></i> My Devices</a></li>
    <li on:click={() => switchMenu("map")} class={$navigationStore && $navigationStore.active === 'map' ? 'bg-blue-400' : ''}><a><i class="fa-solid fa-map"></i> View Map</a></li>
  {:else if $userStore && $userStore.role === 'admin'}
    <li on:click={() => switchMenu("allUsers")} class={$navigationStore && $navigationStore.active === 'allUsers' ? 'bg-blue-400' : ''}><a><i class="fa-solid fa-users"></i> Manage Users</a></li>
  {:else if $userStore && $userStore.role === 'superadmin'}
    <li on:click={() => switchMenu("allAdmins")} class={$navigationStore && $navigationStore.active === 'allAdmins' ? 'bg-blue-400' : ''}><a><i class="fa-solid fa-users"></i> Manage Admins</a></li>
  {/if}
</ul>
<div class="btm-nav md:hidden shadow-inner">
  {#if $userStore && $userStore.role === 'user'}
    <button on:click={() => switchMenu("overview")} class="py-4 text-primary tooltip" data-tip="Overview" class:active={$navigationStore && $navigationStore.active === 'overview'}>
      <i class="fa-solid fa-eye"></i>
    </button>
    <button on:click={() => switchMenu("allDevices")} class="py-4 text-primary tooltip" data-tip="All Devices" class:active={$navigationStore && $navigationStore.active === 'allDevices'}>
      <i class="fa-solid fa-server"></i>
    </button>
    <button on:click={() => switchMenu("map")} class="py-4 text-primary tooltip" data-tip="View Map" class:active={$navigationStore && $navigationStore.active === 'map'}>
      <i class="fa-solid fa-map"></i>
    </button>
  {:else if $userStore && $userStore.role === 'admin'}
    <button on:click={() => switchMenu("allUsers")} class="py-4 text-primary tooltip" data-tip="All Users" class:active={$navigationStore && $navigationStore.active === 'allUsers'}>
      <i class="fa-solid fa-users"></i>
    </button>
  {:else if $userStore && $userStore.role === 'superadmin'}
    <button on:click={() => switchMenu("allAdmins")} class="py-4 text-primary tooltip" data-tip="All Admins" class:active={$navigationStore && $navigationStore.active === 'allAdmins'}>
      <i class="fa-solid fa-users"></i>
    </button>
  {/if}
</div>
<style>
  /* your styles go here */
</style>