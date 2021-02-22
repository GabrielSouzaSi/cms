<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <TitleC :title="title" :subTitle="subTitle" />
        <AlertC :alertMessage="alertMessage" />
        <Table :category="category" :table="table" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import barramento from "@/eventBus/barramento";
import AlertC from "@/components/Alert";
import TitleC from "../Title";
import Table from "./Table";
export default {
  components: {
    Table,
    AlertC,
    TitleC,
  },
  data() {
    return {
      title: "Eventos",
      subTitle: "Ambiente de administração dos eventos!",
      table: [],
      category: [],
      message: null,
      alertMessage: null,
    };
  },
  created() {
    barramento.$on("createEvent", (message) => {
      this.message = message;
      console.log(message);
      this.upEvents();
    });
    barramento.$on("alertEvent", (message) => {
      this.message = message;
      console.log(message);
      this.upEvents();
    });
    // barramento.$on("upTableEvent", (message) => {
    //   this.alertTitle =
    //     "Evento editado com sucesso! Esse aviso será encerrado em ";
    //   this.dismissCountDown = this.dismissSecs;
    // });
    barramento.$emit("loadMain", true);
    this.$http
      .get(`categories`)
      .then((res) => {
        this.mapCategory(res.data);
        barramento.$emit("loadMain", false);
      })
      .catch(function (error) {
        barramento.$emit("loadMain", false);
        console.log(error);
      });
    this.upEvents();
  },
  methods: {
    mapCategory(data) {
      // var arr = Array();
      // data.map(function (item) {
      //   arr.push(item.id, item.name, item.color);
      // });
      let arr = data.map(function (item) {
        return {
          id: item.id,
          name: item.name,
          color: item.color,
          description: item.description,
        };
      });
      this.category = arr;
    },
    upEvents() {
      barramento.$emit("loadMain", true);
      this.$http
        .get(`events`)
        .then((res) => {
          this.table = res.data;
          barramento.$emit("loadMain", false);
          this.alertMessage = this.message;
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>