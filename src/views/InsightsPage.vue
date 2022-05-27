<!--
<template>
  <section>
    <InsightsData :categorised-txs="this.categorisedTxs" />
  </section>
</template>
-->


<template>
  <section>
    <div>
      <router-link
        :to="{
          name: 'Home',
        }"
        >Home Page
      </router-link>
      >
      <router-link
        :to="{
          name: 'categorisePage',
        }"
        >Categorise Transactions
      </router-link>
      > Insights
    </div>
    <button
      @click="getInsights()"
      type="button"
      class="btn btn-primary mt-2 mb-2"
    >
      Display Insights!
    </button>
    <h2>Insights</h2>
    <div id="graph"></div>
    <div id="categoriesByMonth"></div>
  </section>
  <section>
    <div>
      <router-link
        :to="{
          params: { categorisedTxs: JSON.stringify(this.categorisedTxs) },
          name: 'Budget',
        }"
      >
        <button class="btn btn-primary">Build a Budget</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import Plotly from "plotly.js-dist/plotly";

export default {
  name: "InsightsData",
  props: {
    categorisedTxs: { type: Object, required: true },
  },
  data() {
    return {};
  },

  methods: {
    totalMonthlyData() {
      let monthlyData = {};
      for (const category in this.categorisedTxs) {
        this.categorisedTxs[category].forEach((el) => {
          let date = el.Date.replace("/", "-").replace("/", "");
          date = date.slice(0, 7);
          if (!(date in monthlyData)) monthlyData[date] = 0;
          let amount = el["Amount\r"].replace("-", "").replace("\r", "");
          amount = parseFloat(amount);
          monthlyData[date] += amount;
        });
      }

      var trace1 = {
        x: Object.keys(monthlyData),
        y: Object.values(monthlyData),
        name: "Expenses",
        marker: { color: "rgb(26, 118, 255)" },
        type: "bar",
      };

      var data = [trace1];

      var layout = {
        title: "Total Expenses by Month",
        xaxis: {
          tickfont: {
            size: 14,
            color: "rgb(107, 107, 107)",
          },
          type: "category",
        },
        yaxis: {
          title: "NZD ($)",
          titlefont: {
            size: 16,
            color: "rgb(107, 107, 107)",
          },
          tickfont: {
            size: 14,
            color: "rgb(107, 107, 107)",
          },
        },
        legend: {
          x: 0,
          y: 1.0,
          bgcolor: "rgba(255, 255, 255, 0)",
          bordercolor: "rgba(255, 255, 255, 0)",
        },
        bargap: 0.15,
      };

      Plotly.newPlot("graph", data, layout);
    },
    monthlyDataByCategory() {
      let categoriesByMonth = {};

      for (const category in this.categorisedTxs) {
        categoriesByMonth[category] ??= {};
        this.categorisedTxs[category].forEach((el) => {
          let date = el.Date.replace("/", "-").replace("/", "");
          date = date.slice(0, 7);

          if (!(date in categoriesByMonth[category]))
            categoriesByMonth[category][date] = 0;

          let amount = el["Amount\r"].replace("-", "").replace("\r", "");
          amount = parseFloat(amount);
          categoriesByMonth[category][date] += amount;
        });
      }

      let graphData = [];

      for (const category in categoriesByMonth) {
        let trace = {
          name: category,
          type: "bar",
          x: [],
          y: [],
        };

        for (const [key, value] of Object.entries(
          categoriesByMonth[category]
        )) {
          trace.x.push(key);
          trace.y.push(value);
        }
        graphData.push(trace);
      }

      var layout = {
        title: "Monthly Expenses by Category",
        xaxis: {
          tickfont: {
            size: 14,
            color: "rgb(107, 107, 107)",
          },
          type: "category",
        },
        yaxis: {
          title: "NZD ($)",
          titlefont: {
            size: 16,
            color: "rgb(107, 107, 107)",
          },
          tickfont: {
            size: 14,
            color: "rgb(107, 107, 107)",
          },
        },
        legend: {
          x: 0,
          y: 1.0,
          bgcolor: "rgba(255, 255, 255, 0)",
          bordercolor: "rgba(255, 255, 255, 0)",
        },
        bargap: 0.15,
        barmode: "group",
      };

      Plotly.newPlot("categoriesByMonth", graphData, layout);
    },
    getInsights() {
      this.totalMonthlyData();
      this.monthlyDataByCategory();
    },
  },
};
</script>