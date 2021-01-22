<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <Table />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import barramento from "@/eventBus/barramento";
import Table from "./Table";
export default {
  components: {
    Table,
  },
  data() {
    return {};
  },
  created() {
    barramento.$emit("loadMain", true);
    this.upEvents();
  },
  methods: {
    async upEvents() {
      try {
        const res = await this.$http.get("events");
        console.log(res.data);
        barramento.$emit("loadMain", false);
      } catch (error) {
        console.log(error);
        barramento.$emit("loadMain", false);
      }
    },
  },
};
</script>

<style>
</style>