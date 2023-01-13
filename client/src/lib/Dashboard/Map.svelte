<script>
    import { Map, Marker } from '@beyonk/svelte-mapbox'
	import { onMount } from 'svelte';
	import { api } from '../../api/Api';
	import { notificationCenter } from '../../config/notification';
    let mapComponent
    
    let loading = false;
    let allDevices = []
   
    
    function onReady() {
        mapComponent.flyTo({center:[47.2425279, -1.6296781]}) 
	}

  const getDevices = async () => {
    loading = true
    api.getDevices().then(res => {
      allDevices = res.data
      loading = false
    }).catch(err => {
      notificationCenter.displayErrorNotification("Failed to fetch all devices")
      loading = false
    })
  }
  
  onMount(() => {
    getDevices();
  })

  const onDeleteDevice = async (currentDevice) => {
    loading = true;
    
    try {
      await api.removeDevice(currentDevice.id);
      notificationCenter.displaySuccessNotification("Device deleted successfully");
      getDevices();
    } catch(err) {
      notificationCenter.displayErrorNotification("Failed to deleted device");
    }finally {
      loading = false;
    }
  }
</script>

  <div class="w-full h-[500px]">
    <Map accessToken="pk.eyJ1Ijoia2F5bWthc3NhaTI2OSIsImEiOiJjbDlpZnBkemMwN2prM3V0NWY4aWp6bjF2In0.gAVDArLVqLnjG4o1Uttgkw"
    style="mapbox://styles/mapbox/outdoors-v11"
    bind:this={mapComponent} 
    on:ready={onReady}
  >
     {#each allDevices as device}
        <Marker lat={parseFloat(device.latitude)} lng={parseFloat(device.longitude)} label={device.device_name}>
          <div class="content" slot="popup">
            <h3 class="font-bold">{device.device_name}</h3>
            <p>{device.device_description}</p>
            <p>Status: {device.status}</p>
            <button class="btn btn-sm btn-error" on:click={() => onDeleteDevice(device)}>Remove device</button>
          </div> 
        </Marker>
     {/each}
  </Map>
  </div>
<style>
  /* your styles go here */
</style>
