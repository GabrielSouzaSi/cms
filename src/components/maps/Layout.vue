<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <TitleC :title="title" :subTitle="subTitle" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="input-group mb-2">
          <select class="form-control" @change="pointsArray" v-model="selected">
            <option value disabled selected>Selecionar Rota</option>
            <option
              v-for="(value, index) in lines"
              :key="index"
              v-bind:value="value.id"
            >{{value.number}} - {{value.description}} - {{value.sense}}</option>
          </select>
          <div class="input-group-append">
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-primary dropdown"
                data-toggle="dropdown"
                id="rotas"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <b-icon-arrow-left-right></b-icon-arrow-left-right>
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="rotas">
                <a class="dropdown-item" href="#" @click="editLines()">Editar Rota</a>
                <a class="dropdown-item" href="#" @click="creatLine()">Adicionar Rota</a>
              </div>
            </div>
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-warning dropdown"
                data-toggle="dropdown"
                id="bus"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20">
                  <path
                    d="M19.063,5H18.75V3.125C18.75,1.375,14.875,0,10,0S1.25,1.375,1.25,3.125V5H.938A.937.937,0,0,0,0,5.938V9.063A.938.938,0,0,0,.938,10H1.25v6.25A1.25,1.25,0,0,0,2.5,17.5v1.25A1.25,1.25,0,0,0,3.75,20H5a1.25,1.25,0,0,0,1.25-1.25V17.5h7.5v1.25A1.25,1.25,0,0,0,15,20h1.25a1.25,1.25,0,0,0,1.25-1.25V17.5h.25a.986.986,0,0,0,1-1V10h.313A.938.938,0,0,0,20,9.063V5.938A.937.937,0,0,0,19.063,5ZM6.25,2.813A.312.312,0,0,1,6.563,2.5h6.875a.312.312,0,0,1,.313.313v.625a.312.312,0,0,1-.312.313H6.563a.312.312,0,0,1-.312-.312ZM4.375,15.625a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,4.375,15.625Zm5-4.375H5A1.25,1.25,0,0,1,3.75,10V6.25A1.25,1.25,0,0,1,5,5H9.375Zm1.25,0V5H15a1.25,1.25,0,0,1,1.25,1.25V10A1.25,1.25,0,0,1,15,11.25Zm5,4.375a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,15.625,15.625Z"
                  />
                </svg>
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bus">
                <a class="dropdown-item" href="#" @click="openSchedule">Horários dos ônibus!</a>
              </div>
            </div>
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-danger dropdown"
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
            <b-button v-b-tooltip.hover @click="openModalMap" title="Abrir Mapa!">
              <b-icon-map></b-icon-map>
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Table v-if="table.length" :table="table"></Table>
      </b-col>
    </b-row>
    <Modal />
    <ModalRota :points="points" />
    <ModalBus :lines="lines" />
    <ModalMap :lines="lines" />
  </b-container>
</template>

<script>
import $ from "jquery";
import barramento from "@/eventBus/barramento";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import TitleC from "../Title";
import Table from "./Table";
import Modal from "./Modal";
import ModalRota from "./ModalRota";
import ModalBus from "./ModalBus";
import ModalMap from "./ModalMap";

export default {
  components: {
    TitleC,
    Table,
    Modal,
    ModalRota,
    ModalBus,
    ModalMap
  },
  data() {
    return {
      lineBus: [],
      title: "Rotas, Horários e Paradas",
      subTitle: "Ambiente de administração das rotas, horários e paradas!",
      selected: "",
      lines: [],
      lineSelected: [],
      pointArray: [],
      table: [],
      points: [],
      index: []
    };
  },
  created() {
    barramento.$emit("loadMain", true);
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
      this.$http
        .get(`lines/${this.selected}/points`)
        .then(res => {
          this.table = res.data.points;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    openModalMap() {
      barramento.$emit("mMap", true);
    },
    addPoint() {
      barramento.$emit("point", false);
    },
    getPoints() {
      this.$http
        .get("points")
        .then(res => {
          this.selected = "";
          this.table = res.data;
          this.points = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    creatLine() {
      barramento.$emit("line", false);
    },
    editLines() {
      if (this.selected) {
        this.$http
          .get(`lines/${this.selected}/points`)
          .then(res => {
            barramento.$emit("line", res.data);
          })
          .catch(function(error) {
            console.log(error);
          });
        // let line_points = this.lines.filter(item => item.id == this.selected);
      } else {
        barramento.$emit(
          "alert",
          "Selecione Uma Rota! Esse aviso será encerrado em"
        );
      }
    },
    upLines() {
      this.$http
        .get("lines")
        .then(res => {
          this.lines = res.data.sort(function(a, b) {
            return a.number - b.number;
          });
          barramento.$emit("loadMain", false);
          this.selected ? this.pointsArray() : this.getPoints();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    openSchedule() {
      this.$http
        .get("schedule")
        .then(res => {
          barramento.$emit("mSchedule", res.data);
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