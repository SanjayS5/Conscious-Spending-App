<template>
  <div>
    <h5>Upload your csv here:</h5>

    <input
      class="form-control mb-4 bg-dark text-white"
      type="file"
      ref="myFile"
      @change="selectedFile"
    />
  </div>
</template>

<script>
export default {
  name: "FileParser",
  methods: {
    selectedFile() {
      const ASB_KEYS = [
        "Date",
        "Unique Id",
        "Tran Type",
        "Cheque Number",
        "Payee",
        "Memo",
        "Amount\r",
      ];
      const ASB_KEYS_CLEANED = [
        "Date",
        "Unique Id",
        "Tran Type",
        "Cheque Number",
        "Payee",
        "Memo",
        "Amount",
      ];

      // const ANZ_KEYS = [
      //   "Type",
      //   "Details",
      //   "Particulars",
      //   "Code",
      //   "Reference",
      //   "Amount",
      //   "Date",
      //   "ForeignCurrencyAmount",
      //   "ConversionCh",
      // ];

      // const BNZ_KEYS = [
      //   "Date",
      //   "Amount",
      //   "Tran Type",
      //   "Particulars",
      //   "Payee",
      //   "Reference",
      //   "Code",
      // ];

      let file = this.$refs.myFile.files[0];
      if (!file || file.type !== "text/csv") return;

      // Credit: https://stackoverflow.com/a/754398/52160
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt) => {
        this.text = evt.target.result;
        const str = this.text;
        const delimiter = ",";
        let headers = str.slice(0, str.indexOf("\n")).split(delimiter);

        // console.log("CSV headers:", headers);
        // console.log("ASB_KEYS", ASB_KEYS);
        // console.log(JSON.stringify(ASB_KEYS) == JSON.stringify(headers));

        if (JSON.stringify(headers) == JSON.stringify(ASB_KEYS)) {
          headers = ASB_KEYS_CLEANED;
        }

        // slice from \n index + 1 to the end of the text
        // use split to create an array of each csv value row
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");

        // Map the rows
        // split values from each row into an array
        // use headers.reduce to create an object
        // object properties derived from headers:values
        // the object passed as an element of the array
        const arr = rows.map(function (row) {
          const values = row.split(delimiter);
          const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
          }, {});
          return el;
        });

        this.$emit("file-parsed-event", arr);
        return arr;
      };
      reader.onerror = (evt) => {
        console.error(evt);
      };
    },
  },
};
</script>

<style scoped>
</style>