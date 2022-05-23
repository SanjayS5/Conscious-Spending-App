<template>
  <h4>{{ categoryName }}</h4>
  <p>Total: {{ total }}</p>
  <button @click="addTx(tx)" type="button" class="btn btn-primary mt-2 mb-2">
    {{ categoryName }}
  </button>
  <li v-for="query in this.queries" :key="query">
    {{ query }}
  </li>
</template>

<script>
export default {
  name: "CategoryView",
  emits: ["query-added-event", "tx-categorised-event"],
  props: {
    categoryName: String,
    propertyName: String,
    tx: Array,
    query: String,
  },
  methods: {
    addTx(txArray) {
      this.queries.push(this.query);
      this.$emit("query-added-event", this.query);

      txArray.forEach((tx) => {
        const amount = tx["Amount\r"].replace("-", "");
        this.txs.push(Number(amount));

        this.categorisedTxs.category = this.propertyName;
        this.categorisedTxs.txs.push(tx); // so we can filter these out in App.js
      });

      this.$emit("tx-categorised-event", this.categorisedTxs);
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