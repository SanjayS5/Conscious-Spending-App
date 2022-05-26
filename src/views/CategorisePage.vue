<template>
  <section>
    <div class="container">
      <section>
        <h1>Categorise</h1>
        <div>
          <FileParser @file-parsed-event="initialiseTxsData" />
        </div>
      </section>
      <TxFilter :search="search" @search-event="updateQuery" />
      <div class="d-flex justify-content-between mb-3">
        <button
          class="btn btn-primary"
          v-for="(categoryString, category) in this.categories"
          :key="category"
          @click="
            updateCategorisedTxs(category);
            saveQuery(category);
          "
        >
          {{ categoryString }}
        </button>
        <button class="btn btn-primary" @click="ignoreTx">
          Ignore Transaction
        </button>
      </div>
      <!-- <div class="d-flex">
        <button
          class="btn btn-primary flex-fill"
          v-for="(categoryString, category) in this.categories"
          :key="category"
          @click="categoriseTx(category)"
        >
          {{ categoryString }}
        </button>
      </div> -->

      <div class="row">
        <div class="col-4">
          <div>
            <CategoryView
              v-for="(categoryString, category) in this.categories"
              :key="category"
              :tx="this.categorisedTxs[category]"
              :category-name="categoryString"
              :category="category"
              :query="this.categorisedQuery"
              @query-added-event="resetCategorisedQuery"
              @undo-categorise-event="reinjectTxs"
            />
          </div>
        </div>
        <div class="col">
          <TransactionRows :txs="this.filteredTxs" />
        </div>
        <div>
          <router-link
            :to="{
              params: { categorisedTxs: JSON.stringify(this.categorisedTxs) },
              name: 'Insights',
            }"
            >Insights
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TransactionRows from "../components/TransactionRows";
import TxFilter from "../components/TxFilter.vue";
import CategoryView from "../components/CategoryView.vue";
import FileParser from "../components/FileParser.vue";
export default {
  components: {
    TransactionRows,
    TxFilter,
    CategoryView,
    // InsightsData,
    FileParser,
  },
  methods: {
    initialiseTxsData(arr) {
      this.txs = arr;
      this.uncategorisedTxs = arr;
      this.filteredTxs = arr;
    },
    search(searchTerm) {
      const filteredArray = this.uncategorisedTxs.filter(
        (tx) => tx.Memo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
      this.filteredTxs = filteredArray;
    },
    ignoreTx() {
      this.ignoredTxs.push(...this.filteredTxs);
      const filteredTxs = this.filterArray(
        this.uncategorisedTxs,
        this.filteredTxs
      );
      this.uncategorisedTxs = filteredTxs;
      this.filteredTxs = this.uncategorisedTxs;
    },
    filterArray(arr1, arr2) {
      let filtered = arr1.filter((item) => !arr2.includes(item));
      return filtered;
    },
    updateQuery(query) {
      // temp data, overwrites the previous query
      if (this.filteredTxs.length > 1) this.query = query;
    },
    saveQuery(category) {
      // when a transaction is categorised, the final query is saved and sent to the categoryView page
      if (this.filteredTxs.length > 1) {
        this.categorisedQuery[category] = this.query;
      }
    },
    resetCategorisedQuery() {
      this.categorisedQuery = {};
    },
    updateCategorised(categorisedQuery) {
      this.categorised.push(categorisedQuery);
    },
    updateCategorisedTxs(category) {
      this.categorisedTxs[category].push(...this.filteredTxs);

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
    reinjectTxs(txs, category) {
      this.uncategorisedTxs.push(...txs);

      // let arrayCopy = [...this.uncategorisedTxs];

      // const ids = arrayCopy.map((obj) => obj.id);
      // const filtered = arrayCopy.filter(({ "Unique Id": id }, index) => {
      //   // if (ids.includes(id, index + 1)) console.log("ID FOUND", id);
      //   return !ids.includes(id, index + 1);
      // });

      // this.uncategorisedTxs = filtered;
      this.filteredTxs = this.uncategorisedTxs;
      this.undoCategoriseTxs(txs, category);
    },
    undoCategoriseTxs(txs, category) {
      console.log("Undoing these", JSON.stringify(txs));
      this.categorisedTxs[category] = this.categorisedTxs[category].filter(
        (tx) => {
          return !txs.includes(tx);
        }
      );
    },
  },
  data() {
    return {
      txs: [],
      uncategorisedTxs: [], // Remaining txs after some are categorised
      filteredTxs: [], // temporary
      query: "", // temp data
      categorisedQuery: {}, // this gets sent to the category view
      categorised: [],
      categories: {
        fixed: "Fixed",
        household: "Household",
        leisure: "Leisure",
        fooddrink: "Food & Drink",
        lifestyle: "Lifestyle",
        income: "Income",
      },
      categorisedTxs: {
        fixed: [],
        household: [],
        leisure: [],
        fooddrink: [],
        lifestyle: [],
        income: [],
      },
      ignoredTxs: [],
    };
  },
};
</script>
