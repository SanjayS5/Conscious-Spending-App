<template>
  <section>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link
                class="nav-link"
                :to="{
                  name: 'Home',
                }"
                >Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{
                  name: 'categorisePage',
                }"
                >Categorise Transactions
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{
                  params: { categorisedTxs: JSON.stringify({}) },
                  name: 'Budget',
                }"
                >Planner
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>

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