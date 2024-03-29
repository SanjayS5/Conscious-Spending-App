<template>
  <div class="mb-3">
    <h4>{{ categoryName }}</h4>
    <p>Total: {{ total }}</p>
    <li v-for="query in this.queries" :key="query.query">
      <button
        class="btn-primary"
        id="subitem-btn"
        @click="undoCategorisation(query)"
      >
        X
      </button>
      {{ query.query }}
    </li>
  </div>
</template>

<script>
export default {
  name: "CategoryView",
  emits: ["query-added-event", "tx-categorised-event", "undo-categorise-event"],
  props: {
    categoryName: String,
    category: String,
    tx: Array,
    query: Object,
  },
  methods: {
    addTx(txArray) {
      // prevents an empty list item being added to the query area
      if (this.query[this.category] !== undefined) {
        let uncategorisedTxs = txArray.filter((tx) => {
          return !(this.categorisedTxs.txs.indexOf(tx) > -1);
        });

        this.categorisedTxs.txs.push(...uncategorisedTxs);
        this.$emit("tx-categorised-event", this.categorisedTxs);

        const queryAndTxs = {
          query: this.query[this.category],
          txs: uncategorisedTxs,
        };

        if (this.queries.indexOf(queryAndTxs) > -1) {
          console.log("tx already in query");
        } else {
          this.queries.push(queryAndTxs);
          this.$emit("query-added-event", this.query);
        }
      }
    },
    undoCategorisation(query) {
      // filter, then return the queries to the parent to be re-injected
      // console.log("BEFORE UNDO", JSON.stringify(query));
      const filteredTxs = this.categorisedTxs.txs.filter((el) => {
        return !query.txs.includes(el);
      });
      this.categorisedTxs.txs = filteredTxs;

      const remainingQueries = this.queries.filter((el) => {
        const stringToRemove = el.query;
        return !query.query.includes(stringToRemove);
      });
      this.queries = [...remainingQueries];
      this.$emit("undo-categorise-event", query.txs, this.category); // to be re-injected into uncategorised txs pool in parent
    },
  },

  computed: {
    total() {
      if (this.tx.length > 0) {
        let totalAmount = 0;
        this.tx.forEach((tx) => {
          const amount = tx["Amount"].replace("-", "");

          totalAmount += Number(amount);
        });
        return totalAmount;
      } else {
        return 0;
      }
    },
  },
  data() {
    return {
      amountTotal: 0,
      queries: [],
      categorisedTxs: { category: this.category, txs: [] },
    };
  },
  watch: {
    // whenever the tx (prop) array changes, this function will run
    tx: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.

        if (newValue !== oldValue) {
          // pass
        }
        this.addTx(newValue);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
