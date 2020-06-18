<template>
  <div class="card shadow-lg" v-bind:style="{'border-color':cardData.color}">
    <div class="card-header text-light" v-bind:style="{'background-color':cardData.color}">
      <h5 class="mb-0">{{ cardData.name}}</h5>
    </div>
    <div class="card-body">
         <div class="row">
             <div class="col">{{cardData.text.toUpperCase()}}</div>
         <div class="col text-right" v-bind:style="{color:cardData.color}">{{cardData.number}}</div>
         </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object
    }
  }
};
</script>

<style>
</style>