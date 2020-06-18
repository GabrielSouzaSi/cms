<template>
  <div>
    <b-select v-model="selected" class="mb-3">
      <template v-slot:first>
        <b-select-option :value="null" disabled>-- Selecionar Rota --</b-select-option>
      </template>
      <b-select-option
        v-for="(value, index) in options"
        :key="index"
        v-bind:value="value.value"
      >{{value.text}}</b-select-option>
    </b-select>

    <div class="mt-2">
      Selected:
      <strong>{{ selected }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: [
        { value: "a", text: "This is First option" },
        { value: "b", text: "Default Selected Option" },
        { value: "c", text: "This is another option" },
        { value: "d", text: "This one is disabled", disabled: true }
      ]
    };
  }
};
</script>