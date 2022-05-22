<template>
  <div>
    Upload your csv here:
    <input
      class="form-control mb-4"
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
      let file = this.$refs.myFile.files[0];
      if (!file || file.type !== "text/csv") return;

      // Credit: https://stackoverflow.com/a/754398/52160
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt) => {
        this.text = evt.target.result;
        const str = this.text;
        const delimiter = ",";
        const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

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