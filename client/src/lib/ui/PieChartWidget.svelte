<script>
  import { Bar } from 'svelte-chartjs';
  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';
  
  export let totalOnlineDevices = 0;
  export let totalOfflineDevices = 0;

  Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );

  const data = {
  labels: ['Online', 'Offline'],
  datasets: [
    {
      label: "Devices",
      data: [totalOnlineDevices, totalOfflineDevices],
      backgroundColor: [
        'rgba(255, 134,159,0.4)',
        'rgba(98,  182, 239,0.4)',
      ],
      borderWidth: 2,
      borderColor: [
        'rgba(255, 134, 159, 1)',
        'rgba(98,  182, 239, 1)',
      ],
    },
  ],
};

</script>
<div class="w-full h-full shadow-md">
  <Bar {data} options={{ responsive: true }} />
</div>
