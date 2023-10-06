<template>
  <b-container class="bv-example-row">
    <b-row align-h="center">
      <b-col cols="6">
        <b-button block variant="success" @click="gerateTableData()"
          >Gerar</b-button
        >
      </b-col>
    </b-row>

    <div v-for="(table, index) in tables" :key="index">
      <b-row align-h="center">
        <b-col cols="6">
          <b-table striped hover :items="table"></b-table>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>
  
  <script>
export default {
  data() {
    return {
      lines: null,
      tables: [],
      items: [
        [
          { first_name: "Dickerson", last_name: "Macdonald" },
          { first_name: "Larsen", last_name: "Shaw" },
          { first_name: "Geneva", last_name: "Wilson" },
          { first_name: "Jami", last_name: "Carney" },
        ],
        [
          { first_name: "Dickerson", last_name: "Macdonald" },
          { first_name: "Larsen", last_name: "Shaw" },
          { first_name: "Geneva", last_name: "Wilson" },
          { first_name: "Jami", last_name: "Carney" },
        ],
        [
          { first_name: "Dickerson", last_name: "Macdonald" },
          { first_name: "Larsen", last_name: "Shaw" },
          { first_name: "Geneva", last_name: "Wilson" },
          { first_name: "Jami", last_name: "Carney" },
        ],
      ],
    };
  },
  created() {
    this.$http
      .get("lines")
      .then((res) => {
        this.lines = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    gerateTableData() {
      let data = [];
      this.lines.map((item) => {
        data.push([{
          description: `${item.number} - ${item.description} - ${item.sense}`,
        }]);
      });
      this.tables = data;
    },
  },
};
</script>