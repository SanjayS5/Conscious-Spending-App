<template>
  <section>
    <div class="container">
      <div class="mb-5">
        <!-- spacer -->
        <p><br /></p>
      </div>
      <div>
        <router-link
          :to="{
            name: 'Home',
          }"
          >Home Page
        </router-link>
        > Categorise
      </div>
      <div class="mb-2">
        <!-- spacer -->
        <p><br /></p>
      </div>
      <section>
        <div class="mb-5">
          <h1>Categorise</h1>
          <p>
            On this page, you'll t ake a snapshot of your current finances. This
            will help you understand where your money has been going. Don't
            worry about making it perfect!
          </p>
          <h4>A Note on Fixed Expenses</h4>
          <p>
            Recurring expenses you cannot stop paying for, even if you wanted
            to. Eg. Rent, utilities, debt repayments etc.
          </p>
        </div>

        <div>
          <FileParser @file-parsed-event="initialiseTxsData" />
        </div>
      </section>
      <TxFilter :search="search" @search-event="updateQuery" />
      <div class="d-flex justify-content-between mb-4">
        <div>
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
        </div>

        <button class="btn btn-primary" @click="ignoreTx">
          Ignore Transaction
        </button>
      </div>

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
          <div class="mb-5">
            <router-link
              :to="{
                params: { categorisedTxs: JSON.stringify(this.categorisedTxs) },
                name: 'Insights',
              }"
            >
              <button class="btn btn-primary">View Insights</button>
            </router-link>
          </div>
          <div>
            <button class="btn btn-secondary" @click="resetData">
              Reset All Data
            </button>
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
      if (this.filteredTxs.length > 0) this.query = query;
    },
    saveQuery(category) {
      // when a transaction is categorised, the final query is saved and sent to the categoryView page
      if (this.filteredTxs.length > 0) {
        this.categorisedQuery[category] = this.query;
      }
    },
    resetCategorisedQuery() {
      this.categorisedQuery = {};
    },
    // updateCategorised(categorisedQuery) {
    //   this.categorised.push(categorisedQuery);
    // },
    updateCategorisedTxs(category) {
      if (!this.filteredTxs.length > 0) {
        // prevents categorising queries when there are no txs that match the filter
        return null;
      }

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

      this.filteredTxs = this.uncategorisedTxs;
      this.undoCategoriseTxs(txs, category);
    },
    undoCategoriseTxs(txs, category) {
      this.categorisedTxs[category] = this.categorisedTxs[category].filter(
        (tx) => {
          return !txs.includes(tx);
        }
      );
    },
    resetData() {
      localStorage.setItem(
        "categorisedTxs",
        JSON.stringify({
          fixed: [],
          household: [],
          leisure: [],
          fooddrink: [],
          lifestyle: [],
          income: [],
        })
      );
      localStorage.setItem("filteredTxs", JSON.stringify([]));
      localStorage.setItem("uncategorisedTxs", JSON.stringify([]));
      localStorage.setItem("categorisedQuery", JSON.stringify({}));
      this.filteredTxs = [];
    },
  },
  mounted() {
    this.categorisedTxs =
      JSON.parse(localStorage.getItem("categorisedTxs")) || this.categorisedTxs;
    this.filteredTxs = JSON.parse(localStorage.getItem("filteredTxs")) || [];
    this.uncategorisedTxs =
      JSON.parse(localStorage.getItem("uncategorisedTxs")) || [];
    this.categorisedQuery =
      JSON.parse(localStorage.getItem("categorisedQuery")) || {};
  },
  watch: {
    categorisedTxs: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
        if (newValue !== oldValue) {
          // pass
        }

        localStorage.setItem("categorisedTxs", JSON.stringify(newValue));
        localStorage.setItem("filteredTxs", JSON.stringify(this.filteredTxs));
        localStorage.setItem(
          "uncategorisedTxs",
          JSON.stringify(this.uncategorisedTxs)
        );
        localStorage.setItem(
          "categorisedQuery",
          JSON.stringify(this.categorisedQuery)
        );
      },
      deep: true,
    },
  },
  data() {
    return {
      txs: [],
      uncategorisedTxs: [], // Remaining txs after some are categorised
      filteredTxs: [], // temporary
      query: "", // temp data
      categorisedQuery: {}, // this gets sent to the category view
      // categorised: [],
      categories: {
        fixed: "Fixed Expenses",
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

<style scoped>
li {
  list-style: none;
}
</style>
