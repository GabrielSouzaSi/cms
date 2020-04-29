<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="input-group mb-3">
          <select class="form-control form-control-sm" @change="pointsArray" v-model="selected">
            <option value="" disabled selected>Selecionar Rota</option>
            <option
              v-for="(value, index) in lines"
              :key="index"
              v-bind:value="value.id"
            >{{ value.number }} - {{value.description}} - {{value.sense}}</option>
          </select>
          <div class="input-group-append">
            <button
              class="btn btn-sm btn-success"
              data-toggle="tooltip"
              title="Editar Rota!"
              type="button"
              @click="editLines()"
            >
              <b-icon-pencil></b-icon-pencil>
            </button>
            <button
              class="btn btn-sm btn-primary"
              data-toggle="tooltip"
              title="Adicionar Rota!"
              type="button"
              @click="creatLine()"
            >
              <b-icon-plus-square></b-icon-plus-square>
            </button>
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-sm btn-danger dropdown"
                data-toggle="dropdown"
                id="btnGroupDrop1"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <b-icon-geo-alt></b-icon-geo-alt>
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
                <a class="dropdown-item" href="#" @click="addPoint()">Criar Ponto!</a>
                <a class="dropdown-item" href="#" @click="getPoints()">Todos os Pontos!</a>
              </div>
            </div>
            <button
              class="btn btn-sm btn-info"
              data-toggle="tooltip"
              title="Abrir Mapa!"
              type="button"
              @click="openModalMap"
            >
              <b-icon-map></b-icon-map>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Table v-if="table.length" :table="table"></Table>
    <!-- <DataTable v-if="datatable.length" :datatable="datatable" /> -->
    <Modal />
    <ModalRota :points="points" />
  </div>
</template>

<script>
import $ from "jquery";
import barramento from "@/eventBus/barramento";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import Table from "./Table";
import Modal from "./Modal";
import ModalRota from "./ModalRota";

export default {
  components: {
    Table,
    Modal,
    ModalRota
  },
  data() {
    return {
      selected: "",
      points: [],
      lines: [],
      lineSelected: [],
      pointArray: [],
      table: [],
      index: []
    };
  },
  created() {
    this.upLines();
    barramento.$on("table", table => {
      this.index = this.lines
        .map(function(item) {
          return item.id;
        })
        .indexOf(this.selected);
      delete this.lines[this.index].points;
      this.lines[this.index].points = table;
      console.log(table);
    });
     barramento.$on("creatPoint", message => {
      this.upLines();
      barramento.$emit("alert", message);
    });
    barramento.$on("delPoint", message => {
      this.upLines();
      barramento.$emit("alert", message);
    });
    barramento.$on("edited", message => {
      this.upLines();
      barramento.$emit("alert", message);
    });
  },
  mounted() {
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
  methods: {
    pointsArray() {
      const line_points = this.lines.filter(item => item.id == this.selected);

      let data = line_points.map(item => item.points);

      this.table = data[0].map(
        ({ id, number, sense, adress, district, lat, lgt, climatizado }) => ({
          id,
          number,
          sense,
          adress,
          district,
          lat,
          lgt,
          climatizado
        })
      );
      // console.log(index)
    },
    openModalMap() {
      window.open(
        "rotas.html",
        "_blank",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=100"
      );
    },
    addPoint() {
      barramento.$emit("point", false);
    },
    getPoints() {
      this.$http
        .get("points")
        .then(res => {
          this.selected = ''
          this.table = res.data;
          this.points = res.data
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    creatLine(){
      barramento.$emit("line", false);
    },
    editLines() {
      const line_points = this.lines.filter(item => item.id == this.selected);
    
      barramento.$emit("line", line_points[0]);
      
    },
    upLines() {
      this.$http
        .get("lines")
        .then(res => {
          this.lines = res.data.sort(function(a, b) {
            return a.number - b.number;
          });
          // console.log(this.lines);
          this.selected
            ? this.pointsArray()
            : this.getPoints()
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.btn-purple {
  background-color: #6f42c1;
}
</style>