<template>
  <b-container fluid class="animation">
    <b-row>
      <b-col>
        <Alert :alertData="alertData"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <FormUsers :userData="userData"/>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <TableUsers />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Alert from "../Alert";
import FormUsers from "./Form";
import TableUsers from "./TableUsers";
import barramento from "@/eventBus/barramento";
export default {
  components: {
    Alert,
    FormUsers,
    TableUsers
  },
  data() {
    return {
      alertData: "",
      userData: {}
    };
  },
  created() {
    barramento.$on("alertEvent", data => {
      this.alertData = data;
    });
    barramento.$on("editUserData", data => {
      this.userData = data;
    });
  }
};
</script>

<style>
</style>