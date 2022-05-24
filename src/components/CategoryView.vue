<template>
  <h4>{{ categoryName }}</h4>
  <p>Total: {{ total }}</p>
  <!-- <button @click="addTx(tx)" type="button" class="btn btn-primary mt-2 mb-2">
    {{ categoryName }}
  </button> -->
  <li
    v-for="query in this.queries"
    :key="query.query"
    @click="undoCategorisation(query)"
  >
    {{ query.query }}
  </li>
</template>

<script>
export default {
  name: "CategoryView",
  emits: ["query-added-event", "tx-categorised-event", "undo-categorise-event"],
  props: {
    categoryName: String,
    propertyName: String,
    tx: Array,
    query: String,
  },
  methods: {
    addTx(txArray) {
      // keep track of txs so we can re-insert them into the uncategorised pool if we decide to undo categorisation later
      const queryAndTxs = { query: this.query, txs: this.tx };
      this.queries.push(queryAndTxs);
      this.$emit("query-added-event", this.query);

      txArray.forEach((tx) => {
        const amount = tx["Amount\r"].replace("-", "");
        this.txs.push(Number(amount));

        this.categorisedTxs.category = this.propertyName;
        this.categorisedTxs.txs.push(tx); // so we can filter these out in App.js
      });

      this.$emit("tx-categorised-event", this.categorisedTxs);
    },
    undoCategorisation(query) {
      // filter, then return the queries to the parent to be re-injected
      const filteredTxs = this.categorisedTxs.txs.filter((el) => {
        return !query.txs.includes(el);
      });
      this.categorisedTxs.txs = filteredTxs;

      query.txs.forEach((el) => {
        const amount = el["Amount\r"].replace("-", "");
        const indexToRemove = this.txs.indexOf(amount);
        this.txs.splice(indexToRemove);
      });

      const remainingQueries = this.queries.filter((el) => {
        const stringToRemove = el.query;
        return !query.query.includes(stringToRemove);
      });
      this.queries = remainingQueries;
      this.$emit("undo-categorise-event", query.txs); // to be re-injected into uncategorised txs pool in parent
    },
  },
  computed: {
    total() {
      return this.txs.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      );
    },
  },
  data() {
    return {
      txs: [0],
      queries: [],
      categorisedTxs: { category: this.propertyName, txs: [] },
    };
  },
};
</script>