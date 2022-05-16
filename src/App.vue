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
              category-name="Housing"
              property-name="housing"
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
</template>


<script>
import FileParser from "./components/FileParser";
import TransactionRows from "./components/TransactionRows";
import TxFilter from "./components/TxFilter.vue";
import CategoryView from "./components/CategoryView.vue";

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
      // const txArray = txObject.txs;
      // const txCateogry = txObject.

      const { category, txs } = txObject;

      this.categorisedTxs[category].push(...txs);

      // switch (txObject.category) {
      //   case "housing":
      //     this.categorisedTxs.housing.push(...txArray); // extends an array with spread operator
      // }

      // const filterArray = (arr1, categoriesObj) => {
      //   const filtered = arr1.filter((el) => {
      //     for (const category in categoriesObj) {
      //       console.log(category);
      //       if (categoriesObj[category].includes(el)) {
      //         console.log("FOUND");
      //       }
      //       return !categoriesObj[category].includes(el);
      //     }
      //   });
      //   return filtered;
      // };

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
  },
  data() {
    return {
      txs: [],
      uncategorisedTxs: [], // Remaining txs after some are categorised
      filteredTxs: [], // temporary
      query: "", // temp data
      categorised: [],
      categorisedTxs: {
        housing: [],
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
