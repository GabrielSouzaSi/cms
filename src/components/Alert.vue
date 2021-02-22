<template>
<div>
  <b-alert
    v-show="show"
    :show="dismissCountDown"
    dismissible
    fade
    variant="success"
    @dismiss-count-down="countDownChanged"
  >{{alertMessage}} {{ dismissCountDown }} segundos</b-alert>
</div>
</template>

<script>
export default {
  props: {
    alertMessage: {
      type: String
    }
  },
  data() {
    return {
      show: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.show = true;
      this.dismissCountDown = this.dismissSecs;
    }
  },
  watch: {
    alertMessage(v1) {
      v1 ? this.showAlert() : (this.show = false);
    }
  }
};
</script>

<style>
</style>