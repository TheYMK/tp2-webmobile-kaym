<script>
  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper/index.mjs";
	import DevicesWidget from "./DevicesWidget.svelte";
	import PieChartWidget from "./PieChartWidget.svelte";

  export let data = {};

  const { item } = gridHelp;
  const id = () => "_" + Math.random().toString(36).substr(2, 9);

  let items = [
    {
      id: id(),
      5: item({
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      }),
      3: item({ x: 0, w: 2, h: 2, y: 0 }),
      1: item({ x: 0, y: 0, w: 1, h: 2 }),
      data: {
        category: 'device'
      }
    },
    {
      id: id(),
      5: item({
        x: 2,
        y: 0,
        w: 3,
        h: 4,
      }),
      3: item({ x: 2, w: 1, h: 2, y: 0 }),
      1: item({ x: 0, y: 2, w: 1, h: 2 }),
      data: {
        category: 'chart'
      }
    },
  ];

  const cols = [
    [1500, 5],
    [1024, 3],
    [500, 1],
  ];
</script>

<div>
  <div class="demo-container size">
    <Grid bind:items={items} rowHeight={100} let:item {cols} let:index let:dataItem>
      {#if dataItem.data.category === "device"}
        <DevicesWidget {data} />         
      {/if}
      {#if dataItem.data.category === "chart"}
        <PieChartWidget totalOnlineDevices={data.totalOnlineDevices} totalOfflineDevices={data.totalOfflineDevices} />   
      {/if}
    </Grid>
  </div>
</div>


<style>
    .size {
    max-width: 1100px;
    width: 100%;
  }
  .demo-container {
    width: 100%;
  }
</style>