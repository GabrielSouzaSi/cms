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
            >
              {{ value.number }} - {{ value.description }} - {{ value.sense }}
            </option>
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
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="rotas"
              >
                <a class="dropdown-item" href="#" @click="editLines()"
                  >Editar Rota</a
                >
                <a class="dropdown-item" href="#" @click="creatLine()"
                  >Adicionar Rota</a
                >
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M19.063,5H18.75V3.125C18.75,1.375,14.875,0,10,0S1.25,1.375,1.25,3.125V5H.938A.937.937,0,0,0,0,5.938V9.063A.938.938,0,0,0,.938,10H1.25v6.25A1.25,1.25,0,0,0,2.5,17.5v1.25A1.25,1.25,0,0,0,3.75,20H5a1.25,1.25,0,0,0,1.25-1.25V17.5h7.5v1.25A1.25,1.25,0,0,0,15,20h1.25a1.25,1.25,0,0,0,1.25-1.25V17.5h.25a.986.986,0,0,0,1-1V10h.313A.938.938,0,0,0,20,9.063V5.938A.937.937,0,0,0,19.063,5ZM6.25,2.813A.312.312,0,0,1,6.563,2.5h6.875a.312.312,0,0,1,.313.313v.625a.312.312,0,0,1-.312.313H6.563a.312.312,0,0,1-.312-.312ZM4.375,15.625a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,4.375,15.625Zm5-4.375H5A1.25,1.25,0,0,1,3.75,10V6.25A1.25,1.25,0,0,1,5,5H9.375Zm1.25,0V5H15a1.25,1.25,0,0,1,1.25,1.25V10A1.25,1.25,0,0,1,15,11.25Zm5,4.375a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,15.625,15.625Z"
                  />
                </svg>
              </button>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="bus"
              >
                <a class="dropdown-item" href="#" @click="openBusList()"
                  >Lista de ônibus</a
                >
                <a class="dropdown-item" href="#" @click="openSchedule()"
                  >Horários dos ônibus</a
                >
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
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="btnGroupDrop1"
              >
                <a class="dropdown-item" href="#" @click="addPoint()"
                  >Criar Ponto!</a
                >
                <a class="dropdown-item" href="#" @click="getPoints()"
                  >Todos os Pontos!</a
                >
              </div>
            </div>
            <b-button
              v-b-tooltip.hover
              @click="openModalMap"
              title="Abrir Mapa!"
            >
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
    <ModalBus v-if="selected" :lines="lines" />
    <ModalbBusList />
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
import ModalbBusList from "./ModalBusList.vue";

export default {
  components: {
    TitleC,
    Table,
    Modal,
    ModalRota,
    ModalBus,
    ModalMap,
    ModalbBusList,
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
      index: [],
      busOld: [
        {
          value: 1,
          text: "NÃO INFORMADO",
        },
        {
          value: 17,
          text: "CAR1109",
        },
        {
          value: 82,
          text: "CAR1110",
        },
        {
          value: 117,
          text: "CAR1111",
        },
        {
          value: 114,
          text: "CAR1112",
        },
        {
          value: 22,
          text: "CAR1113",
        },
        {
          value: 18,
          text: "CAR1114",
        },
        {
          value: 13,
          text: "CAR1115",
        },
        {
          value: 35,
          text: "CAR1201",
        },
        {
          value: 44,
          text: "CAR1202",
        },
        {
          value: 21,
          text: "CAR1203",
        },
        {
          value: 99,
          text: "CAR1204",
        },
        {
          value: 42,
          text: "CAR1205",
        },
        {
          value: 12,
          text: "CAR1301",
        },
        {
          value: 25,
          text: "CAR1302",
        },
        {
          value: 109,
          text: "CAR1303",
        },
        {
          value: 8,
          text: "CAR1304",
        },
        {
          value: 95,
          text: "CAR1305",
        },
        {
          value: 7,
          text: "CAR1306",
        },
        {
          value: 115,
          text: "CAR1307",
        },
        {
          value: 10,
          text: "CAR1308",
        },
        {
          value: 72,
          text: "CAR1309",
        },
        {
          value: 11,
          text: "CAR1310",
        },
        {
          value: 110,
          text: "CAR1311",
        },
        {
          value: 108,
          text: "CAR1312",
        },
        {
          value: 96,
          text: "CAR1313",
        },
        {
          value: 112,
          text: "CAR1314",
        },
        {
          value: 9,
          text: "CAR1315",
        },
        {
          value: 38,
          text: "CAR1316",
        },
        {
          value: 88,
          text: "CAR1317",
        },
        {
          value: 116,
          text: "CAR1318",
        },
        {
          value: 36,
          text: "CAR1319",
        },
        {
          value: 5,
          text: "CAR1320",
        },
        {
          value: 75,
          text: "CAR1321",
        },
        {
          value: 94,
          text: "CAR1322",
        },
        {
          value: 107,
          text: "CAR1323",
        },
        {
          value: 86,
          text: "CAR1324",
        },
        {
          value: 19,
          text: "CAR1325",
        },
        {
          value: 118,
          text: "CAR1401",
        },
        {
          value: 74,
          text: "CAR1402",
        },
        {
          value: 104,
          text: "CAR1403",
        },
        {
          value: 119,
          text: "CAR1404",
        },
        {
          value: 43,
          text: "CAR1405",
        },
        {
          value: 73,
          text: "CAR1406",
        },
        {
          value: 6,
          text: "CAR1407",
        },
        {
          value: 124,
          text: "CAR1408",
        },
        {
          value: 123,
          text: "CAR1409",
        },
        {
          value: 85,
          text: "CAR1801",
        },
        {
          value: 70,
          text: "CAR1802",
        },
        {
          value: 4,
          text: "CAR1803",
        },
        {
          value: 120,
          text: "CAR1804",
        },
        {
          value: 71,
          text: "CAR2303",
        },
        {
          value: 20,
          text: "CAR3001",
        },
        {
          value: 40,
          text: "CAR3002",
        },
        {
          value: 32,
          text: "CAR3003",
        },
        {
          value: 27,
          text: "CAR3004",
        },
        {
          value: 28,
          text: "CAR3005",
        },
        {
          value: 34,
          text: "CAR3006",
        },
        {
          value: 121,
          text: "CAR3007",
        },
        {
          value: 29,
          text: "CAR3008",
        },
        {
          value: 98,
          text: "CAR3009",
        },
        {
          value: 30,
          text: "CAR3010",
        },
        {
          value: 81,
          text: "CAR3012",
        },
        {
          value: 79,
          text: "CAR3013",
        },
        {
          value: 84,
          text: "CAR3111",
        },
        {
          value: 37,
          text: "CAR3112",
        },
        {
          value: 41,
          text: "CAR3113",
        },
        {
          value: 113,
          text: "CAR3114",
        },
        {
          value: 89,
          text: "CAR3117",
        },
        {
          value: 90,
          text: "CAR3118",
        },
        {
          value: 76,
          text: "CAR3119",
        },
        {
          value: 39,
          text: "CAR3201",
        },
        {
          value: 33,
          text: "CAR3202",
        },
        {
          value: 78,
          text: "CAR3203",
        },
        {
          value: 122,
          text: "CAR3204",
        },
        {
          value: 31,
          text: "CAR3205",
        },
      ],
      pointOld: [
        [
          "1706",
          "AVENIDA CENTENARIO",
          "CINTURÃO VERDE",
          "2.7998087",
          "-60.7098835",
          0,
        ],
        [
          "1707",
          "AVENIDA CENTENARIO",
          "CINTURÃO VERDE",
          "2.8019319",
          "-60.715806",
          0,
        ],
        [
          "1708",
          "RUA ABDALA HABBI FRAXE",
          "JOQUEI CLUBE",
          "02.80299",
          "-60.71946",
          0,
        ],
        ["1709", "AVENIDA OLIMPICA", "OLIMPICO", "2.7964701", "-60.7305188", 0],
        [
          "1710",
          "AVENIDA JESUALDO COSTA LIMA",
          "CRUVIANA",
          "2.8105559",
          "-60.7767666",
          0,
        ],
        [
          "1711",
          "AVENIDA JESUALDO COSTA LIMA",
          "CRUVIANA",
          "2.8127967",
          "-60.7755959",
          0,
        ],
        [
          "1712",
          "AVENIDA JESUALDO COSTA LIMA",
          "CRUVIANA",
          "2.8144412",
          "-60.7747172",
          0,
        ],
        [
          "1713",
          "AVENIDA ATAÍDE TEIVE",
          "EQUATORIAL",
          "2.8149566",
          "-60.7712821",
          0,
        ],
        [
          "1714",
          "AVENIDA ATAÍDE TEIVE",
          "EQUATORIAL",
          "2.815154",
          "-60.7682676",
          0,
        ],
        [
          "1715",
          "AVENIDA ATAÍDE TEIVE",
          "EQUATORIAL",
          "2.8152747",
          "-60.7658113",
          0,
        ],
        [
          "1716",
          "AVENIDA ATAIDE TEIVE",
          "EQUATORIAL",
          "2.8154793",
          "-60.7628124",
          0,
        ],
        [
          "1717",
          "AVENIDA ATAIDE TEIVE",
          "EQUATORIAL",
          "2.8156185",
          "-60.7602815",
          0,
        ],
        [
          "1718",
          "AVENIDA ATAIDE TEIVE",
          "ALVORADA",
          "2.8158679",
          "-60.7562994",
          0,
        ],
        [
          "1719",
          "AVENIDA ATAIDE TEIVE",
          "ALVORADA",
          "2.8160038",
          "-60.7539601",
          0,
        ],
        ["1720", "AVENIDA ATAIDE TEIVE", "ALVORADA", "2.816132", "-60.7521", 0],
        [
          "1721",
          "AVENIDA ATAIDE TEIVE",
          "ALVORADA",
          "2.8162625",
          "-60.7495967",
          0,
        ],
        [
          "1722",
          "AVENIDA ATAIDE TEIVE",
          "ALVORADA",
          "2.8164053",
          "-60.7472834",
          0,
        ],
        [
          "1723",
          "AVENIDA ATAIDE TEIVE",
          "NOVA CANÃA",
          "2.8165911",
          "-60.7439749",
          0,
        ],
        [
          "1724",
          "AVENIDA ATAIDE TEIVE",
          "NOVA CANÃA",
          "2.8167718",
          "-60.740872",
          0,
        ],
        [
          "1725",
          "AVENIDA AMAZONAS",
          "DOS ESTADOS 2",
          "2.8447197",
          "-60.6669807",
          0,
        ],
        [
          "1726",
          "AVENIDA AMAZONAS",
          "DOS ESTADOS 2",
          "2.8467025",
          "-60.6665127",
          0,
        ],
        [
          "1727",
          "AVENIDA LUIZ CANUTO CHAVENIDAES",
          "PARAVIANA",
          "2.8587767",
          "-60.6533983",
          0,
        ],
        [
          "1728",
          "AVENIDA LUIZ CANUTO CHAVENIDAES",
          "CAÇARI",
          "2.8559366",
          "-60.6502083",
          0,
        ],
        [
          "1729",
          "AVENIDA LUIZ CANUTO CHAVENIDAES",
          "CAÇARI",
          "2.8544267",
          "-60.6484957",
          0,
        ],
        [
          "9100",
          "RUA AUGUSTO CEZAR L. MOURA",
          "PARAVIANA",
          "2.8652312",
          "-60.6676422",
          0,
        ],
        [
          "9101",
          "RUA AUGUSTO CEZAR L. MOURA",
          "PARAVIANA",
          "2.8633971",
          "-60.6655722",
          0,
        ],
        [
          "9102",
          "RUA AUGUSTO CEZAR L. MOURA",
          "PARAVIANA",
          "2.8613919",
          "-60.6633268",
          0,
        ],
        [
          "9103",
          "RUA AUGUSTO CEZAR L. MOURA",
          "PARAVIANA",
          "2.8594325",
          "-60.6611027",
          0,
        ],
        [
          "9104",
          "RUA AUGUSTO CEZAR L. MOURA",
          "PARAVIANA",
          "2.8570099",
          "-60.6583576",
          0,
        ],
        ["9105", "AVENIDA VILLE ROY", "CAÇARI", "2.8476299", "-60.649741", 0],
        [
          "9106",
          "AVENIDA VILLE ROY",
          "NOSSA S. APARECIDA",
          "2.8405356",
          "-60.6559504",
          0,
        ],
        [
          "9107",
          "AVENIDA VILLE ROY",
          "NOSSA S. APARECIDA",
          "2.8385477",
          "-60.6576546",
          0,
        ],
        [
          "9108",
          "AVENIDA VILLE ROY",
          "SÃO FRANCISCO",
          "2.8286117",
          "-60.6663268",
          0,
        ],
        ["9109", "AVENIDA VILLE ROY", "CENTRO", "2.82355", "-60.67074", 0],
        [
          "78",
          "AVENIDA CARLOS PEREIRA DE MELO",
          "SANTA TEREZA",
          "2.8353059",
          "-60.7280146",
          1,
        ],
        [
          "1512",
          "RUA FRANCISCO ANACLETO DA SILVA",
          "EQUATORIAL",
          "2.8225673",
          "-60.7646955",
          0,
        ],
        [
          "242",
          "RUA REINALDO NEVES",
          "JARDIM FLORESTA",
          "2.82742",
          "-60.71021",
          0,
        ],
        [
          "73",
          "AVENIDA NAZARÉ FILGUEIRAS",
          "DR. SILVIO BOTELHO",
          "2.8075146",
          "-60.7453923",
          1,
        ],
        [
          "6630000",
          "AV. CAP. ENE GARCÊS",
          "CENTRO",
          "2.821835",
          "-60.673743",
          1,
        ],
        [
          "6640000",
          "R. BARRETO LEITE",
          "CENTRO",
          "2.8145415",
          "-60.6698933",
          0,
        ],
      ],
      i: 0,
    };
  },
  created() {
    barramento.$emit("loadMain", true);
    this.upLines();
    // this.addBus(this.i);
    // this.addPoints(this.i);

    barramento.$on("table", (table) => {
      this.index = this.lines
        .map(function (item) {
          return item.id;
        })
        .indexOf(this.selected);
      delete this.lines[this.index].points;
      this.lines[this.index].points = table;
      console.log(table);
    });
    barramento.$on("creatPoint", (message) => {
      this.upLines();
      barramento.$emit("alert", message);
    });
    barramento.$on("delPoint", (message) => {
      this.upLines();
      barramento.$emit("alert", message);
    });
    barramento.$on("edited", (message) => {
      this.upLines();
      barramento.$emit("alert", message);
    });
  },
  mounted() {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
  methods: {
    pointsArray() {
      this.$http
        .get(`lines/${this.selected}/points`)
        .then((res) => {
          this.table = res.data.points;
          barramento.$emit("loadMain", false);
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
          console.log(error);
        });
    },
    openModalMap() {
      barramento.$emit("mMap", true);
    },
    addPoint() {
      barramento.$emit("point", false);
    },
    openBusList() {
      barramento.$emit("mBusList");
    },
    getPoints() {
      this.$http
        .get("points")
        .then((res) => {
          this.selected = "";
          this.table = res.data;
          this.points = res.data;
          barramento.$emit("loadMain", false);
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
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
          .then((res) => {
            barramento.$emit("line", res.data);
          })
          .catch(function (error) {
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
        .then((res) => {
          this.lines = res.data.sort(function (a, b) {
            return a.number - b.number;
          });
          this.selected ? this.pointsArray() : this.getPoints();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    openSchedule() {
      barramento.$emit("mSchedule", this.selected);
    },
    addBus(i) {
      if (i < this.busOld.length) {
        console.log(i);
        this.$http
          .post(`bus`, {
            idBus: this.busOld[i].value,
            description: this.busOld[i].text,
          })
          .then(() => {
            this.i++;
            this.addBus(this.i);
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }
    },
    addPoints(i) {
      if (i < this.pointOld.length) {
        console.log(this.pointOld[i][0]);
        this.$http
          .post("points", {
            number: this.pointOld[i][0],
            address: this.pointOld[i][1],
            district: this.pointOld[i][2],
            lat: this.pointOld[i][3],
            lgt: this.pointOld[i][4],
            "air-conditioning": this.pointOld[i][5],
          })
          .then(() => {
            this.i++;
            this.addPoints(this.i);
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }
    },
  },
};
</script>

<style>
.btn-purple {
  background-color: #6f42c1;
}
</style>