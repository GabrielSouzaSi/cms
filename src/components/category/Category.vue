<template>
  <b-container fluid>
    <b-row align-h="center" class="mt-5">
      <b-col cols="12" md="8">
        <TitleC :title="title" :subTitle="subTitle" />
        <Table v-if="table.length" :table="table" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TitleC from "../Title";
import barramento from "@/eventBus/barramento";
import Table from "./Table";
export default {
  components: {
    TitleC,
    Table
  },
  data() {
    return {
      title: "Categorias",
      subTitle: "Ambiente de administração das categorias dos Eventos!",
      table: []
    };
  },
  created() {
    barramento.$emit("loadMain", true);
    this.upTable();
    barramento.$on("upData", message => {
      this.upTable();
      barramento.$emit("alertCategory", message);
    });
  },
  methods: {
    upTable (){
      this.$http
        .get(`categories`)
        .then(res => {
          this.table = res.data;
          console.log(res.data);
          barramento.$emit("loadMain", false);
        })
        .catch(function(error) {
          barramento.$emit("loadMain", false);
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>