<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <FileParser @file-parsed-event="initialiseTxsData" />
  <section>
    <div>
      <p><br /></p>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <TxFilter :search="search" @search-event="updateQuery" />
          <div>
            <CategoryView
              category-name="Fixed Expenses"
              property-name="fixed"
              :tx="this.filteredTxs"
              :query="this.query"
              @query-added-event="updateCategorised"
              @tx-categorised-event="updateCategorisedTxs"
            />
            <CategoryView
              category-name="Household"
              property-name="household"
              :tx="this.filteredTxs"
              :query="this.query"
              @query-added-event="updateCategorised"
              @tx-categorised-event="updateCategorisedTxs"
            />
            <CategoryView
              category-name="Leisure"
              property-name="leisure"
              :tx="this.filteredTxs"
              :query="this.query"
              @query-added-event="updateCategorised"
              @tx-categorised-event="updateCategorisedTxs"
            />
            <CategoryView
              category-name="Food & Drink"
              property-name="fooddrink"
              :tx="this.filteredTxs"
              :query="this.query"
              @query-added-event="updateCategorised"
              @tx-categorised-event="updateCategorisedTxs"
            />
            <CategoryView
              category-name="Lifestyle"
              property-name="lifestyle"
              :tx="this.filteredTxs"
              :query="this.query"
              @query-added-event="updateCategorised"
              @tx-categorised-event="updateCategorisedTxs"
            />
            <CategoryView
              category-name="Income"
              property-name="income"
              :tx="this.filteredTxs"
              :query="this.query"
              @query-added-event="updateCategorised"
              @tx-categorised-event="updateCategorisedTxs"
            />
          </div>
        </div>
        <div class="col">
          <TransactionRows :txs="this.filteredTxs" />
        </div>
      </div>
    </div>
  </section>
  <section>
    <button
      @click="getInsights()"
      type="button"
      class="btn btn-primary mt-2 mb-2"
    >
      Show insights!
    </button>
    <h2>Insights</h2>
    <div id="graph"></div>
  </section>
</template>


<script>
import FileParser from "./components/FileParser";
import TransactionRows from "./components/TransactionRows";
import TxFilter from "./components/TxFilter.vue";
import CategoryView from "./components/CategoryView.vue";
import Plotly from "plotly.js-dist/plotly";

export default {
  name: "App",
  components: {
    FileParser,
    TransactionRows,
    TxFilter,
    CategoryView,
  },
  methods: {
    search(searchTerm) {
      const filteredArray = this.uncategorisedTxs.filter(
        (tx) => tx.Memo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
      this.filteredTxs = filteredArray;
    },
    initialiseTxsData(arr) {
      this.txs = arr;
      this.uncategorisedTxs = arr;
      this.filteredTxs = arr;
    },
    updateQuery(query) {
      // temp data, overwrites the previous query
      this.query = query;
    },
    updateCategorised(categorisedQuery) {
      this.categorised.push(categorisedQuery);
    },
    updateCategorisedTxs(txObject) {
      const { category, txs } = txObject;

      this.categorisedTxs[category].push(...txs);

      const filterArray = (arr1, categoriesObj) => {
        let filtered = [...arr1];
        for (const category in categoriesObj) {
          console.log(category);
          filtered = filtered.filter((el) => {
            if (categoriesObj[category].includes(el)) {
              console.log("FOUND");
            }
            return !categoriesObj[category].includes(el);
          });
        }
        return filtered;
      };

      const filteredArray = filterArray(
        this.uncategorisedTxs,
        this.categorisedTxs
      );
      this.uncategorisedTxs = filteredArray;
      this.filteredTxs = this.uncategorisedTxs;
    },
    getInsights() {
      // console.log(JSON.stringify(this.categorisedTxs));
      let monthlyData = {};
      for (const category in this.categorisedTxs) {
        console.log(JSON.stringify(this.categorisedTxs[category]));
        this.categorisedTxs[category].forEach((el) => {
          let date = el.Date.replace("/", "-").replace("/", "");
          date = date.slice(0, 7);
          if (!(date in monthlyData)) monthlyData[date] = 0;
          let amount = el["Amount\r"].replace("-", "").replace("\r", "");
          amount = parseFloat(amount);
          monthlyData[date] += amount;
        });
      }

      console.log("Monthly data", JSON.stringify(monthlyData));

      var trace1 = {
        x: Object.keys(monthlyData),
        y: Object.values(monthlyData),
        name: "Expenses",
        // marker: { color: "rgb(55, 83, 109)" },
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
  },
  data() {
    return {
      txs: [],
      uncategorisedTxs: [], // Remaining txs after some are categorised
      filteredTxs: [], // temporary
      query: "", // temp data
      categorised: [],
      categorisedTxs: {
        fixed: [],
        household: [],
        leisure: [],
        fooddrink: [],
        lifestyle: [],
        income: [],
      },
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
