<template>
  <!-- The Modal -->
  <div id="modalBus" class="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Horários</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form action>
            <div class="row">
              <div class="col">
                <div class="input-group mb-3">
                  <select class="form-control" @change="select(selected)" v-model="selected">
                    <option value disabled selected>Selecionar Rota</option>
                    <option
                      v-for="(value, index) in lines"
                      :key="index"
                      :value="value.id"
                    >{{value.number}} - {{value.description}} - {{value.sense}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <b-table
                  v-show="showTable"
                  :items="table[`${radio}`]"
                  :fields="fields"
                  small
                  hover
                  borderless
                  responsive
                  striped
                  class="text-center rounded-lg shadow-lg"
                >
                  <template v-slot:cell(index)="data">{{ data.index + 1 }}</template>
                  <template v-slot:thead-top>
                    <b-tr>
                      <b-th colspan="3">
                        <b-form-group label="Corrida Semanal">
                          <b-form-radio-group
                            size="sm"
                            v-model="radio"
                            :options="options"
                            buttons
                            name="radios-btn"
                            button-variant="outline-secondary"
                          ></b-form-radio-group>
                        </b-form-group>
                      </b-th>
                      <b-th colspan="2">
                        <b-form-group label="Hora e Ônibus">
                          <b-button-group size="sm">
                            <b-button variant="primary" @click="show = !show">
                              <b-icon-plus-square></b-icon-plus-square>
                            </b-button>
                            <b-button variant="success" @click="reply">
                              <b-icon-reply v-if="!replyTable"></b-icon-reply>
                              <b-icon-reply-all-fill v-if="replyTable"></b-icon-reply-all-fill>
                            </b-button>
                          </b-button-group>
                        </b-form-group>
                      </b-th>
                    </b-tr>
                    <b-tr v-show="show">
                      <b-th colspan="5">
                        <b-input-group size="sm" prepend="Saída">
                          <b-form-input
                            type="time"
                            id="startTime"
                            name="startTime"
                            v-model="form.start"
                            style="max-width:100px"
                          ></b-form-input>
                          <b-input-group-prepend is-text>Chegada</b-input-group-prepend>
                          <b-form-input
                            type="time"
                            id="endTime"
                            name="endTime"
                            v-model="form.end"
                            style="max-width:100px"
                          ></b-form-input>
                          <b-input-group-prepend is-text>Ônibus</b-input-group-prepend>
                          <b-form-select v-model="form.busId" :options="bus"></b-form-select>
                          <b-input-group-append>
                            <b-button variant="success" @click="addHour(form)">
                              <b-icon-check></b-icon-check>
                            </b-button>
                            <b-button variant="danger" @click="show = !show">
                              <b-icon-x-square></b-icon-x-square>
                            </b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-th>
                    </b-tr>
                  </template>
                  <template v-slot:cell(busId)="data" class="text-center">{{data.value.text}}</template>
                  <template v-slot:cell(actions)="row" class="text-center">
                    <b-button-group size="sm">
                      <b-button variant="success" @click="row.toggleDetails">
                        <b-icon-dash-circle v-if="row.detailsShowing"></b-icon-dash-circle>
                        <b-icon-pencil v-else></b-icon-pencil>
                      </b-button>
                      <b-button variant="danger" @click="delHour(row.index)">
                        <b-icon-x-square></b-icon-x-square>
                      </b-button>
                    </b-button-group>
                  </template>
                  <template v-slot:row-details="row">
                    <b-input-group size="sm" prepend="Saída">
                      <b-form-input
                        type="time"
                        style="max-width:100px"
                        v-model="temp[`${radio}`][row.index].start"
                      ></b-form-input>
                      <b-input-group-prepend is-text>Chegada</b-input-group-prepend>
                      <b-form-input
                        type="time"
                        style="max-width:100px"
                        v-model="temp[`${radio}`][row.index].end"
                      ></b-form-input>
                      <b-input-group-prepend is-text>Ônibus</b-input-group-prepend>
                      <b-form-select v-model="temp[`${radio}`][row.index].busId" :options="bus"></b-form-select>
                      <b-input-group-append>
                        <b-button
                          variant="success"
                          @click="updateHour(temp[`${radio}`][row.index], row.index)"
                        >
                          <b-icon-check></b-icon-check>
                        </b-button>
                        <b-button
                          variant="primary"
                          @click="upCar(temp[`${radio}`][row.index].busId, row.item)"
                        >
                          <b-icon-backspace></b-icon-backspace>
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </template>
                </b-table>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal footer -->
        <div v-show="showTable" class="modal-footer">
          <div class="col">
            <button type="button" class="btn btn-danger btn-block" data-dismiss="modal">Cancelar</button>
          </div>
          <div class="col">
            <button
              v-if="add"
              type="button"
              class="btn btn-success btn-block"
              @click="addSchedule()"
            >Salvar</button>
            <button
              v-if="!(add)"
              type="button"
              class="btn btn-success btn-block"
              @click="upSchedule()"
            >Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import barramento from "@/eventBus/barramento";
export default {
  props: {
    // todas as linha
    lines: {
      type: Array,
    },
    // id da linha
    // id: {
    //   type: Number
    // }
  },
  data() {
    return {
      show: false,
      showTable: false,
      add: null,
      radio: "1",
      radioTemp: true,
      selected: this.id,
      options: [
        { text: "Dia Útil", value: "1" },
        { text: "Sábado", value: "6" },
        { text: "Domingo", value: "0" },
      ],
      table: [],
      temp: [],
      form: {
        start: "",
        end: "",
        busId: "",
        bus: "",
      },
      fields: [
        {
          key: "index",
          label: "Nº",
        },
        {
          key: "start",
          label: "Saída",
        },
        {
          key: "end",
          label: "Chegada",
        },
        {
          key: "busId",
          label: "Ônibus",
          formatter: (value) => {
            var data = this.bus.filter((item) => item.value == value);
            return data[0];
          },
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
      hour: [],
      bus: [
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
      replyTable: false,
      replyTemp: [],
      schedule: [],
      line_id: null,
      schedule_id: null,
    };
  },
  created() {
    // a função recebe o id da linha selecionada
    barramento.$on("mSchedule", (data) => {
      this.schedule = JSON.parse(JSON.stringify(this.lines));
      this.selected = data;
      // console.log(data);
      this.select(data);
      $("#modalBus").modal();
    });
  },
  methods: {
    week(data) {
      this.table = this.hour[`${data}`];
    },
    addHour(data) {
      if (this.validBus(data)) {
        alert("O Horário e Ônibus já está em utiliazação");
      } else {
        var bus = this.bus.filter((item) => item.value == data.busId);
        this.table[`${this.radio}`].push({
          end: data.end,
          start: data.start,
          busId: data.busId,
          bus: bus[0].text,
        });
        let result = JSON.parse(JSON.stringify(this.table));
        this.table = result;
        alert("horário adicionado!");
      }
    },
    delHour(index) {
      if (
        confirm(
          "Deseja realmente remover a dados da linha " + (index + 1) + "?"
        )
      ) {
        this.table[`${this.radio}`].splice(index, 1);
        let result = JSON.parse(JSON.stringify(this.table));
        this.table = result;
      }
    },
    updateHour(hour, row) {
      // console.log(hour, row)
      let data = JSON.parse(JSON.stringify(hour));
      if (this.validBus(data)) {
        alert("O Horário e Ônibus está em utiliazação!");
      } else {
        var bus = this.bus.filter((item) => item.value == data.busId);
        let result = this.table[`${this.radio}`].map(function (item, index) {
          if (index === row) {
            return {
              start: data.start,
              end: data.end,
              busId: data.busId,
              bus: bus[0].text,
            };
          } else {
            return item;
          }
        });
        this.table[`${this.radio}`] = result;
        const temp = JSON.parse(JSON.stringify(this.table));
        this.table = temp;
        console.log(this.table);
      }
    },
    select(id) {
      let data = this.schedule.filter((item) => item.id === id);

      // console.log(data[0])

      if (data[0].schedules) {
        this.hour = data[0].schedules.hour.weekdays;
        this.schedule_id = data[0].schedules.id;
        this.line_id = data[0].id;
        this.showTable = true;
      } else {
        alert("A rota ainda não possui uma quadro de horário!");
        this.showTable = true;
        this.add = true;
        this.hour = { "0": [], "1": [], "6": [] };
      }
      this.table = JSON.parse(JSON.stringify(this.hour));
    },
    addSchedule() {
      let data = { weekdays: {} };
      data.weekdays = this.table
      this.$http
        .post(`lines/${this.selected}/schedules`, {
          hour: data,
        })
        .then((res) => {
          console.log(res.data);
          alert("Dados salvos!");
        })
        .catch(function (error) {
          console.log(error.response);
        });
      console.log(this.table)
    },
    upSchedule() {
      let data = { weekdays: {} };
      data.weekdays = this.table;
      this.$http
        .put(`schedules/${this.schedule_id}`, {
          hour: data,
        })
        .then((res) => {
          console.log(res.data);
          alert("Dados atualizados!");
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(this.table);
    },
    validBus(data) {
      return (
        this.table[`${this.radio}`].filter(
          (item) =>
            item.busId == data.busId &&
            item.start == data.start &&
            item.end == data.end
        ).length > 0
      );
    },
    reply() {
      if (this.radioTemp) {
        this.replyTable = true;
        this.radioTemp = false;
        let table = JSON.parse(JSON.stringify(this.table[`${this.radio}`]));
        this.replyTemp = table;
        alert("Dados copiados!");
      } else {
        this.table[`${this.radio}`] = this.replyTemp;
        let table = JSON.parse(JSON.stringify(this.table));
        this.table = table;
        this.replyTable = false;
        this.radioTemp = true;
        alert("Dados inseridos!");
      }
    },
    upCar(data, row) {
      var bus = this.bus.filter((item) => item.value == data);
      let result = this.table[`${this.radio}`].map(function (item) {
        // console.log(item.bus,row.bus, bus[0].text);
        if (item.bus === row.bus) {
          return {
            start: item.start,
            end: item.end,
            busId: Number(bus[0].value),
            bus: String(bus[0].text),
          };
        } else {
          return item;
        }
      });
      this.table[`${this.radio}`] = result;
      const temp = JSON.parse(JSON.stringify(this.table));
      this.table = temp;
      console.log(this.table);
    },
  },
  watch: {
    table(v1) {
      this.temp = JSON.parse(JSON.stringify(v1));
    },
  },
};
</script>