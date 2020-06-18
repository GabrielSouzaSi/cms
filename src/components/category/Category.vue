<template>
  <b-container fluid>
    <b-row align-h="center" class="mt-5">
      <b-col cols="12" md="8">
        <TitleC :title="title" :subTitle="subTitle" />
        <Table />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TitleC from "../Title";
import Table from "./Table";
export default {
  components: {
    TitleC,
    Table
  },
  data() {
    return {
      title: "Categorias",
      subTitle: "Ambiente de administração das categorias!"
    };
  }
};
</script>

<style>
</style>