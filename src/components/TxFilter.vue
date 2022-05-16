<template>
  <h3>Filtered Categories</h3>
  <label for="search">
    Search
    <input id="search" v-model="searchTerm" @keyup="searchAndEmit" />
  </label>
</template>


<script>
export default {
  name: "TxFilter",
  emits: ["search-event"],
  props: ["search"],
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    searchAndEmit() {
      this.search(this.searchTerm);
      this.$emit("search-event", this.searchTerm);
    },
  },
};
</script>