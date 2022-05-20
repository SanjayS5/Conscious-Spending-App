<template>
  <div>
    <input
      class="input-group mb-3"
      id="search"
      v-model="searchTerm"
      @keyup="searchAndEmit"
      placeholder="Enter your transaction: Eg. countdown"
    />
  </div>
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