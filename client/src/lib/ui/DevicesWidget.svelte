<script>
  export let data = {};
</script>

<style>
  /* your styles go here */
</style>

<div class="stats shadow w-full h-full">
  <div class="stat">
    <div class="stat-title">Total devices</div>
    <div class="stat-value">{data.allDevices.length}</div>
    <div class="stat-desc">Online devices: {data.totalOnlineDevices}</div>
    <div class="stat-desc">Offline devices: {data.totalOfflineDevices}</div>
  </div>
  
</div>