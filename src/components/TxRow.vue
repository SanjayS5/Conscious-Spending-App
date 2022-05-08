<!--
<template>
    <p>
        <ul>
            <li>Date: {{ tx.Date }}</li>
            <li>Payee: {{ tx.Payee }}</li>
            <li>Memo: {{ tx.Memo }}</li>
            <li>Amount: {{ tx["Amount\r"] }}</li>
        </ul>
    </p>
</template>
-->


<template>
  <td>{{ tx.Date }}</td>
  <td>{{ tx.Payee }}</td>
  <td>{{ tx.Memo }}</td>
  <td>{{ tx["Amount\r"] }}</td>
</template>



<script>
export default {
  name: "TxRow",
  props: {
    tx: Object,
  },
};
</script>