<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <FileParser @file-parsed-event="initialiseTxsData" />
  <section>
    <div>
      <p><br /></p>
    </div>
    <router-link to="/HomePage">HomePage</router-link>
    <router-view></router-view>
  </section>
  <section>
    <div class="container">
      <TxFilter :search="search" @search-event="updateQuery" />
      <div class="row">
        <div class="col-4">
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
  <!-- <section>
    <InsightsData :categorised-txs="this.categorisedTxs" />
  </section> -->
  <!-- <router-link to="/InsightsPage">Insights</router-link> -->
  <!-- <router-link
    :to="{
      path: '/InsightsPage',
      params: this.categorisedTxs,
      name: 'Insights',
      component: InsightsPage,
    }"
    >Insights
  </router-link> -->
  <router-link
    :to="{
      params: { categorisedTxs: JSON.stringify(this.categorisedTxs) },
      name: 'Insights',
    }"
    >Insights
  </router-link>
</template>


<script>
import FileParser from "./components/FileParser";
import TransactionRows from "./components/TransactionRows";
import TxFilter from "./components/TxFilter.vue";
import CategoryView from "./components/CategoryView.vue";
// import InsightsData from "./components/InsightsData.vue";

export default {
  name: "App",
  components: {
    FileParser,
    TransactionRows,
    TxFilter,
    CategoryView,
    // InsightsData,
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
          filtered = filtered.filter((el) => {
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
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  color: #53677d;
  /* margin-top: 60px; */
}
</style>
