<template>
  <!-- The Modal -->
  <div id="modalLine" class="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Rotas</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form action>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="number">Número:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="number"
                    placeholder="Número"
                    name="number"
                    v-model.number="form.number"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="sense">Sentido:</label>
                  <select id="sense" class="form-control" v-model="form.sense">
                    <option>Centro</option>
                    <option>Bairro</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="adress">Nome da rota:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="adress"
                    placeholder="Nome"
                    name="adress"
                    v-model.trim="form.description"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="latA">Origem:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="latA"
                    placeholder="Latitude"
                    name="latA"
                    v-model="form.latA"
                  />
                  <input
                    type="number"
                    class="form-control mt-1"
                    id="lgtA"
                    placeholder="Longitude"
                    name="lgtA"
                    v-model="form.lgtA"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="lgtB">Destino:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="latB"
                    placeholder="Latitude"
                    name="latB"
                    v-model="form.latB"
                  />
                  <input
                    type="number"
                    class="form-control mt-1"
                    id="lgtB"
                    placeholder="Longitude"
                    name="lgtB"
                    v-model="form.lgtB"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <select class="form-control form-control-sm" v-model="selected">
                  <option value disabled selected>Selecionar Parada</option>
                  <option
                    v-for="(value, index) in points"
                    :key="index"
                    v-bind:value="value.id"
                  >{{ value.number }} - {{value.adress}} - {{value.district}} - {{value.sense}}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <b-table v-if="items.length"
                  id="table"
                  :items="items"
                  :fields="fields"
                  head-variant="light"
                  no-border-collapse
                  :small="true"
                  bordered
                  hover
                  responsive
                  class="text-center mt-2"
                >
                  <template v-slot:cell(actions)="data" class="text-center">
                    <b-icon-x-square
                      variant="danger"
                      @click="delPoint(data.item.id)"
                    ></b-icon-x-square>
                  </template>
                </b-table>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <div class="col">
            <button type="button" class="btn btn-danger btn-block" data-dismiss="modal">Cancelar</button>
          </div>
          <div class="col">
            <button
              v-if="add"
              type="button"
              class="btn btn-success btn-block"
              @click="addLine(form)"
            >Salvar</button>
            <button
              v-if="!(add)"
              type="button"
              class="btn btn-success btn-block"
              @click="update(form)"
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
    points: {
      type: Array
    }
  },
  data() {
    return {
      line: null,
      add: false,
      selected: "",
      items: [],
      form: {
        id: null,
        number: null,
        sense: "",
        description: "",
        latA: "",
        lgtA: "",
        latB: "",
        lgtB: "",
        points: []
      },
      fields: [
        {
          key: "number",
          label: "Nº",
          variant: "info"
        },
        {
          key: "sense",
          label: "Sentido"
        },
        {
          key: "adress",
          label: "Endereço"
        },
        {
          key: "district",
          label: "Bairro"
        },
        {
          key: "actions",
          label: "Ações"
        }
      ]
    };
  },
  created() {
    barramento.$on("line", line => {
      
      if (line) {
        this.add = false;
        this.line = line;
        this.items = line.points
        this.form.id = line.id;
        this.form.number = line.number;
        this.form.sense = line.sense;
        this.form.description = line.description;
        this.form.latA = line.latA;
        this.form.lgtA = line.lgtA;
        this.form.latB = line.latB;
        this.form.lgtB = line.lgtB;
        this.getPointLine(line);
      } else {
        (this.form.id = null),
          (this.form.number = null),
          (this.form.sense = ""),
          (this.form.description = ""),
          (this.form.latA = ""),
          (this.form.lgtA = ""),
          (this.form.latB = ""),
          (this.form.lgtB = "");
        this.add = true;
      }
      $("#modalLine").modal();
    });
  },
  methods: {
    addLine(value) {
      console.log(value);
      this.$http
        .post("lines", {
        number: value.number,
        sense: value.sense,
        description: value.description,
        latA: value.latA,
        lgtA: value.lgtA,
        latB: value.latB,
        lgtB: value.lgtB,
        points: this.form.points
        })
        .then(res => {
          console.log(res.data.number);
           $("#modalLine").modal();
           barramento.$emit("creatPoint", 'Linha '+ res.data.number + ' - ' + res.data.description + ' - ' + res.data.sense +' criado com sucesso! Esse aviso será encerrado em ')
        })
        .catch(function(error) {
          console.log(error.response);
          alert(error.response.data.message[0].message)
        });
    },
    update(value) {
      console.log(value);
      if (
        value.number == this.line.number &&
        value.sense == this.line.sense &&
        value.description == this.line.description &&
        value.latA == this.line.latA &&
        value.lgtA == this.line.lgtA &&
        value.latB == this.line.latB &&
        value.lgtB == this.line.lgtB
      ) {
        $("#modalLine").modal("hide");
        alert("Os dados não foram alterados!");
      } else {
        this.$http
          .put(`lines/${value.id}`, {
            number: value.number,
            sense: value.sense,
            description: value.description,
            latA: value.latA,
            lgtA: value.lgtA,
            latB: value.latB,
            lgtB: value.lgtB,
            points: this.form.points
          })
          .then(res => {
            console.log(res.data);
            $("#modalLine").modal("hide");
            barramento.$emit("edited", 'Rota '+ value.number + ' - '+ value.description + ' - '+ value.sense + ' editado com sucesso! Esse aviso será encerrado em ')
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    delPoint(value) {
      
      let array = this.form.points

      let result = array.indexOf(value)

      array.splice(result, 1)

      this.form.points = array

      let point = this.items

      point.splice(result, 1)

      this.items = point      
    },
    getPointLine(line) {
      
      let array = [], point = line.points

      point.map(function (item){
        array.push(item.id)
      })

      this.form.points = array
    }
  }
};
</script>

<style>
</style>