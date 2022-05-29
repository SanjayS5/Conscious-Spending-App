<template>
  <td>{{ tx.Date }}</td>
  <td>{{ tx.Payee }}</td>
  <td>{{ tx.Memo }}</td>
  <td>{{ tx["Amount"] }}</td>
</template>



<script>
export default {
  name: "TxRow",
  props: {
    tx: Object,
  },
};
</script>