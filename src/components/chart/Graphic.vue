<template>
  <div class="card shadow-lg">
    <div class="card-header">
      <h5 class="mb-0">Teste</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col text-center">
          <apexcharts type="pie" width="380" :options="chartOptions" :series="series"></apexcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexcharts: VueApexCharts
  },
  data: function() {
    return {
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: "100%",
          type: "pie"
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 1000,
            options: {
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
    };
  }
};
</script>
<style>
</style>