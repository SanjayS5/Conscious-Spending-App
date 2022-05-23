<template>
  <!-- <FileParser @file-parsed-event="initialiseTxsData" /> -->
  <section class="mx-3">
    <div>
      <p><br /></p>
    </div>
    <router-view></router-view>
    <!-- <router-link
      :to="{
        params: {
          parsedTxs: JSON.stringify(this.txs),
        },
        name: 'categorisePage',
      }"
      >Categorise Transactions
    </router-link> -->
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

  <!-- <router-link
    :to="{
      params: { categorisedTxs: JSON.stringify(this.categorisedTxs) },
      name: 'Insights',
    }"
    >Insights
  </router-link> -->
  <!-- <router-link
    :to="{
      params: {
        uncategorisedTxs: JSON.stringify(this.uncategorisedTxs),
        filteredTxs: JSON.stringify(this.filteredTxs),
        txs: JSON.stringify(this.txs),
      },
      name: 'categorisePage',
    }"
    >Categorise Transactions
  </router-link> -->
</template>

<script>
// import FileParser from "./components/FileParser";

// import InsightsData from "./components/InsightsData.vue";

export default {
  name: "App",
  components: {
    // FileParser,
  },
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
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  color: #53677d;
  /* margin-top: 60px; */
}
</style>
