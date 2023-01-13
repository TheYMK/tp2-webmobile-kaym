<script>
	import WidgetContainer from "../ui/WidgetContainer.svelte";
  import { onMount } from "svelte";
	import { api } from "../../api/Api";
	import { notificationCenter } from "../../config/notification";
	import { load } from "@beyonk/svelte-mapbox/src/lib/asset-loader";

  let allDevices = []
  let data = {
    allDevices: [],
    totalOnlineDevices: 0,
    totalOfflineDevices: 0
  }

  let loading = false

  const getDevices = async () => {
    loading = true
    api.getDevices().then(res => {
      data.allDevices = res.data
      if(data.allDevices.length > 0) {
        data.allDevices.forEach(device => {
          if(device.status === 'online') {
            data.totalOnlineDevices += 1
          }else if(device.status === 'offline') {
            data.totalOfflineDevices += 1
          }
        })
      }
      loading = false
    }).catch(err => {
      notificationCenter.displayErrorNotification("Failed to fetch all devices")
      loading = false
    })
  }
  
  onMount(() => {
    getDevices();
  })
</script>

{#if loading}
   <div class="w-full h-full flex items-center justify-center">Loading ...</div>
{:else}
   <WidgetContainer data={data}/>
{/if}
<style>

</style>
