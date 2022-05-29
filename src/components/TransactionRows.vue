<template>
  <h3>Transaction Rows</h3>
  <div>
    <table class="table table-striped text-muted">
      <thead class="thead-dark">
        <tr>
          <th>Date</th>
          <th>Payee</th>
          <th>Details</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="tx['Unique Id']" v-for="tx in txs">
          <!-- <TxRow :tx="tx" /> -->
          <td>{{ tx.Date }}</td>
          <td>{{ tx.Payee }}</td>
          <td>{{ tx.Memo }}</td>
          <td>{{ tx["Amount"] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import TxRow from "./TxRow";

export default {
  name: "TransactionRows",
  props: {
    txs: Array,
  },
  components: {
    // TxRow,
  },
};
</script>

<style scoped>
td {
  /* border-bottom: 1px solid grey; */
  border: none;
  color: rgb(148, 145, 145);
}

.table-striped > tbody > tr:nth-of-type(odd) > * {
  background-color: #171717;
  color: rgb(148, 145, 145);
}
</style>