<template>
  <section class="">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    initialiseTxsData(arr) {
      this.txs = arr;
      this.uncategorisedTxs = arr;
      this.filteredTxs = arr;
    },
  },
  data() {
    return {
      txs: [],
      uncategorisedTxs: [], // Remaining txs after some are categorised
      filteredTxs: [], // temporary
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #d2d2d2;
  background: black;
}
</style>


<!-- 

Todos:
  Sort the transaction after undo
  Add undo ability on Ignore Transaction
  Add a budgeting page
  cache data
-->