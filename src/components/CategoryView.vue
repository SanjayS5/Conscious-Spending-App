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
    category: String,
    tx: Array,
    query: Object,
  },
  methods: {
    addTx(txArray) {
      // keep track of txs so we can re-insert them into the uncategorised pool if we decide to undo categorisation later
      const queryString = this.query[this.category];
      const queryAndTxs = { query: queryString, txs: this.tx };

      // prevents an empty list item being added to the query area
      if (this.query[this.category] !== undefined) {
        //check tx not already in query.txs
        console.log("CAT VIEW: this.queries", JSON.stringify(this.queries));
        const isObjectInArray = (obj) =>
          JSON.stringify(obj) === JSON.stringify(queryAndTxs);

        this.queries.some(isObjectInArray)
          ? console.log("already in array")
          : this.queries.push(queryAndTxs);
        console.log(
          "AFTER CAT VIEW: this.queries",
          JSON.stringify(this.queries)
        );

        // if (this.queries.indexOf(queryAndTxs)) {
        //   console.log("tx already in query");
        // } else {
        //   console.log("query added");
        //   this.queries.push(queryAndTxs);
        //   this.$emit("query-added-event", this.query);
        // }

        // this.tx.forEach((el) => {
        //   if (!this.queries.txs.includes(el)) {
        //     // this.queries.txs.push(el);
        //     this.queries.push(queryAndTxs);
        //     this.$emit("query-added-event", this.query);
        //   }
        // });

        // if (!this.queries.txs.includes(tx)) {
        // }

        // this.queries.push(queryAndTxs);
        // this.$emit("query-added-event", this.query);
      }

      txArray.forEach((tx) => {
        // check tx not already in categorisedTxs.txs because compute is called again and again so this makes it idempotent
        if (!this.categorisedTxs.txs.includes(tx)) {
          const amount = tx["Amount\r"].replace("-", "");
          this.txs.push(Number(amount));

          this.categorisedTxs.category = this.category;
          this.categorisedTxs.txs.push(tx); // so we can filter these out in App.js
          this.$emit("tx-categorised-event", this.categorisedTxs);
        }
      });
    },
    undoCategorisation(query) {
      // filter, then return the queries to the parent to be re-injected
      // console.log("BEFORE UNDO", JSON.stringify(this.categorisedTxs));
      const filteredTxs = this.categorisedTxs.txs.filter((el) => {
        return !query.txs.includes(el);
      });
      this.categorisedTxs.txs = filteredTxs;
      // console.log("AFTER UNDO", JSON.stringify(this.categorisedTxs));

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
      this.addTx(this.tx);

      return this.txs.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      );
    },
  },
  data() {
    return {
      txs: [0],
      queries: [],
      categorisedTxs: { category: this.category, txs: [] },
    };
  },
};
</script>