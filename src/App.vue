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
          <TxFilter :search="search" />
        </div>
        <div class="col">
          <TransactionRows :txs="this.filteredTxs" />
          <!-- This should take in an already filtered array not the original txs -->
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import FileParser from "./components/FileParser";
import TransactionRows from "./components/TransactionRows";
import TxFilter from "./components/TxFilter.vue";

export default {
  name: "App",
  components: {
    FileParser,
    TransactionRows,
    TxFilter,
  },
  methods: {
    search(searchTerm) {
      console.log("Searching");
      const filteredArray = this.uncategorisedTxs.filter(
        (tx) => tx.Memo.indexOf(searchTerm) > -1
      );
      this.filteredTxs = filteredArray;
    },
    initialiseTxsData(arr) {
      // arr.forEach((element) => {
      //   console.log(element);
      // });
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
