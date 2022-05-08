<template>
  <h3>Transaction Rows</h3>
  <div>
    <table class="table">
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
          <td>{{ tx["Amount\r"] }}</td>
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