<template>
  <b-modal v-model="modalShow" hide-footer size="xl" title="Rotas">
    <!-- <template v-slot:modal-title>Rotas</template> -->
    <b-row class="mb-3">
      <b-col>
        <select class="form-control" @change="loadMap" v-model="selected">
          <option value disabled selected>Selecionar Rota</option>
          <option
            v-for="(value, index) in lines"
            :key="index"
            v-bind:value="value.id"
          >
            {{ value.number }} - {{ value.description }} - {{ value.sense }}
          </option>
        </select>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <gmap-map
          v-show="showMap"
          :center="{ lat: 2.8038037, lng: -60.7055189 }"
          :zoom="13"
          style="width: 100%; height: 600px"
          :options="{ disableDefaultUI: true }"
        >
          <gmap-info-window
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen = false"
          ></gmap-info-window>
          <gmap-marker
            :key="i"
            v-for="(m, i) in markers"
            :position="m.position"
            :clickable="true"
            @click="toggleInfoWindow(m, i)"
          ></gmap-marker>
          <!-- <gmap-marker
            :key="i"
            v-for="(m, i) in bus"
            :position="m.position"
            :clickable="true"
            @click="toggleInfoWindow(m, i)"
          ></gmap-marker> -->
          <gmap-polyline
            :options="{ strokeColor: '#FF0000' }"
            :path="route"
          ></gmap-polyline>
        </gmap-map>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import barramento from "@/eventBus/barramento";
export default {
  props: {
    lines: {
      type: Array
    }
  },
  data() {
    return {
      selected: "",
      modalShow: false,
      showMap: false,
      center: {},
      markers: [],
      bus: [],
      route: [],
      currentPlace: null,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  created() {
    barramento.$on("mMap", data => {
      this.modalShow = data;
    });
  },
  methods: {
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    async formatMap(data) {
      for (let i = 0; i < data.route.length; i++) {
        this.route.push({ lat: data.route[i][0], lng: data.route[i][1] });
      }
      var test = await data.points.map(function(item) {
        return {
          position: { lat: item.lat, lng: item.lgt },
          infoText: `<strong>Parada ${item.number}</item>`
        };
      });
      this.markers = test;
      this.showMap = true;
    },
    loadMap() {
      this.markers = [];
      this.route = [];
      this.$http
        .get(`lines/${this.selected}/points`)
        .then(res => {
          this.formatMap(res.data);
          this.loadBus();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadBus(){
      this.bus = [];
      this.$http
        .get(`lines/${this.selected}`)
        .then(res => {
          console.log(res);

        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  watch: {
    modalShow(v1) {
      if (v1 != true) {
        this.selected = "";
        this.markers = [];
        this.route = [];
        this.showMap = false
      }
    }
  }
};
</script>

<style>
</style>