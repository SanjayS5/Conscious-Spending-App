<template>
  <h3>Filtered Categories</h3>
  <label for="search">
    Search
    <input id="search" v-model="searchTerm" @keypress="search(searchTerm)" />
  </label>
</template>


<script>
export default {
  name: "TxFilter",
  props: ["search"],
  data() {
    return {
      searchTerm: "",
    };
  },
};
</script>