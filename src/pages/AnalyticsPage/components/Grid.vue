<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :responsive-layouts="layouts"
      :col-num="12"
      :row-height="30"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :vertical-compact="true"
      :use-css-transforms="true"
      :responsive="responsive"
      @breakpoint-changed="breakpointChangedEvent"
    >
      <grid-item v-bind="layout[0]">
        <div class="card">
          <h3>Total Users</h3>
          <p class="number">12,450</p>
        </div>
      </grid-item>

      <grid-item v-bind="layout[1]">
        <div class="card">
          <h3>Monthly Sales</h3>
          <apexchart
            type="line"
            height="100%"
            :options="chartOptions"
            :series="chartSeries"
          />
        </div>
      </grid-item>

      <grid-item v-bind="layout[2]">
        <div class="card">
          <h3>Recent Orders</h3>
          <table class="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.customer }}</td>
                <td>${{ order.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { GridLayout, GridItem } from "vue3-grid-layout";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    GridLayout,
    GridItem,
    apexchart: VueApexCharts,
  },

  data() {
    return {
      layouts: {
        lg: [
          { x: 0, y: 0, w: 3, h: 3, i: "0" },
          { x: 3, y: 0, w: 5, h: 4, i: "1" },
          { x: 0, y: 3, w: 8, h: 4, i: "2" },
        ],
      },

      layout: [
        { x: 0, y: 0, w: 3, h: 3, i: "0" },
        { x: 3, y: 0, w: 5, h: 4, i: "1" },
        { x: 0, y: 3, w: 8, h: 4, i: "2" },
      ],

      draggable: true,
      resizable: true,
      responsive: true,

      // Table data
      orders: [
        { id: 1, customer: "John", amount: 250 },
        { id: 2, customer: "Alice", amount: 180 },
        { id: 3, customer: "Mike", amount: 320 },
      ],

      // Chart
      chartSeries: [
        {
          name: "Sales",
          data: [10, 40, 35, 80, 50, 90, 120],
        },
      ],
      chartOptions: {
        chart: { toolbar: { show: false } },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        stroke: { curve: "smooth" },
      },
    };
  },

  methods: {
    breakpointChangedEvent(newBreakpoint, newLayout) {
      // console.log("Breakpoint:", newBreakpoint, "Layout:", newLayout);
    },
  },
};
</script>

<style scoped>
.card {
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.number {
  font-size: 32px;
  font-weight: bold;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
</style>
