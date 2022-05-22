<template>
  <h1>Categorise Page</h1>
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
          <button
            @click="initialiseTxsData()"
            class="btn btn-primary mt-2 mb-2"
          >
            Update transactions
          </button>
          <TransactionRows :txs="this.filteredTxs" />
          <!-- <TransactionRows :txs="this.parsedTxs" /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TransactionRows from "../components/TransactionRows";
import TxFilter from "../components/TxFilter.vue";
import CategoryView from "../components/CategoryView.vue";
export default {
  props: {
    parsedTxs: { type: Array, required: true },
    // filteredTxs: { type: Object, required: true },
    // txs: { type: Object, required: true },
  },
  components: {
    TransactionRows,
    TxFilter,
    CategoryView,
    // InsightsData,
  },
  methods: {
    initialiseTxsData() {
      console.log("Fired");
      this.txs = this.parsedTxs;
      this.uncategorisedTxs = this.parsedTxs;
      this.filteredTxs = this.parsedTxs;
    },
    search(searchTerm) {
      const filteredArray = this.uncategorisedTxs.filter(
        (tx) => tx.Memo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
      this.filteredTxs = filteredArray;
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
