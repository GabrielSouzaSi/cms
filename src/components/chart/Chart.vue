<template>
  <b-container fluid>
    <b-row class="animation">
      <b-col>
        <Card :cardData="totalUsers"/>
      </b-col>
      <b-col>
        <Card :cardData="totalEvents"/>
      </b-col>
      <b-col>
        <Card :cardData="totalViews"/>
      </b-col>
      <!-- <b-col>
        <Card :cardData="totalBvOnline"/>
      </b-col> -->
    </b-row>
    <b-row class="animation mt-5">
      <b-col>
        <Graphic />
      </b-col>
      <b-col>
        <Graphic />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Card from './Card'
import Graphic from './Graphic'
export default {
  components: {
    Card,
    Graphic
  },
  data() {
    return {
      totalUsers: {
        name: 'Usuários APP',
        text: 'Total',
        number: Math.floor(Math.random() * (10000 - 1000) + 1000),
        color: '#3396ff'
      },
      totalEvents: {
        name: 'Eventos',
        text: 'Total',
        number: Math.floor(Math.random() * (10000 - 1000) + 1000),
        color: '#ffa64d'
      },
      totalViews: {
        name: 'Visualizações ',
        text: 'Total',
        number: Math.floor(Math.random() * (10000 - 1000) + 1000),
        color: '#8965cd'
      },
      // totalBvOnline: {
      //   name: 'Usuários BvOnline',
      //   text: 'Total',
      //   number: Math.floor(Math.random() * (10000 - 1000) + 1000),
      //   color: '#6fdc89'
      // },
    }
  }
}
</script>

<style>

</style>