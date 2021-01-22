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
                  <label for="numberRota">Número:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="numberRota"
                    placeholder="Número"
                    name="numberRota"
                    v-model.number="form.number"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="senseRota">Sentido:</label>
                  <select id="senseRota" class="form-control" v-model="form.sense">
                    <option>Centro</option>
                    <option>Bairro</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="adressRota">Nome da rota:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="adressRota"
                    placeholder="Nome"
                    name="adressRota"
                    v-model.trim="form.description"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="input-group my-3">
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      accept=".csv"
                      @change="getFile"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    />
                    <label class="custom-file-label" for="inputGroupFile01">{{file}}</label>
                  </div>
                </div>
              </div>
              <!-- <div class="col">
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
              </div>-->
            </div>
            <div class="row">
              <div class="col">
                <multiselect
                  v-model="value"
                  :options="data"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="false"
                  placeholder="Selecionar parada"
                  label="text"
                  track-by="id"
                  selectLabel="Clique para selecionar"
                  selectedLabel="selecionardo"
                  deselectLabel="Clique para remover"
                  :preselect-first="false"
                >
                  <template slot="selection" slot-scope="{ values, isOpen }">
                    <span
                      class="multiselect__single"
                      v-if="values.length &amp;&amp; !isOpen"
                    >{{ value.length }} paradas selecionadas!</span>
                  </template>
                </multiselect>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <div class="col">
            <button
              type="button"
              class="btn btn-danger btn-block"
              @click="cancel(line)"
              data-dismiss="modal"
            >Cancelar</button>
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
      type: Array,
    },
  },
  data() {
    return {
      data: [],
      line: null,
      add: false,
      file: "Selecionar arquivo CSV!",
      inputFile: true,
      selected: "",
      items: [],
      form: {
        id: null,
        number: null,
        sense: "",
        description: "",
        fileData: [],
        points: [],
      },
      fields: [
        {
          key: "number",
          label: "Nº",
          variant: "info",
        },
        {
          key: "sense",
          label: "Sentido",
        },
        {
          key: "adress",
          label: "Endereço",
        },
        {
          key: "district",
          label: "Bairro",
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
      value: [],
      options: [
        { name: "Vue.js", language: "JavaScript" },
        { name: "Adonis", language: "JavaScript" },
        { name: "Rails", language: "Ruby" },
        { name: "Sinatra", language: "Ruby" },
        { name: "Laravel", language: "PHP" },
        { name: "Phoenix", language: "Elixir" },
      ],
      message: "",
    };
  },
  created() {
    barramento.$on("line", (line) => {
      this.cancel(line);
      $("#modalLine").modal();
    });
  },
  methods: {
    cancel(line) {
      if (line) {
        this.line = line;
        let data = JSON.parse(JSON.stringify(line));
        this.add = false;
        this.value = data.points.map(function (item) {
          return {
            id: item.id,
            text: item.number + " " + item.address + " - " + item.sense,
          };
        });
        this.form.id = data.id;
        this.form.number = data.number;
        this.form.sense = data.sense;
        this.form.description = data.description;
        this.form.fileData = data.route;
        this.file = data.route.length + " pontos totais!";
        // console.log(this.value);
        this.getPointLine(data);
      } else {
        this.file = "Selecionar arquivo CSV!";
        this.value = [];
        this.items = [];
        this.form.id = null;
        this.form.number = null;
        this.form.sense = "";
        this.form.description = "";
        this.form.fileData = [];
        this.add = true;
      }
    },
    addLine(value) {
      $("#modalLine").modal("hide");
      barramento.$emit("loadMain", true);
      this.compare();
      this.$http
        .post("lines", {
          number: value.number,
          sense: value.sense,
          description: value.description.toUpperCase(),
          route: this.form.fileData,
        })
        .then((res) => {
          this.message =
            "Linha " +
            res.data.number +
            " - " +
            res.data.description +
            " - " +
            res.data.sense +
            " criado com sucesso! Esse aviso será encerrado em ";
          this.addPointLine(res.data.id);
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
          alert(error.response.data);
        });
    },
    addPointLine(id) {
      if (this.value.length < 1) {
        $("#modalLine").modal("hide");
        barramento.$emit("loadMain", false);
        barramento.$emit("creatPoint", this.message);
        console.log("Não tem parada!");
      } else {
        console.log("tem parada!");
        this.$http
          .put(`lines/${id}/points/sync`, {
            points: this.form.points,
          })
          .then((res) => {
            console.log(res);
            $("#modalLine").modal("hide");
            barramento.$emit("loadMain", false);
            barramento.$emit("creatPoint", this.message);
          })
          .catch(function (error) {
            $("#modalLine").modal("hide");
            barramento.$emit("loadMain", false);
            console.log(error.response);
            alert(error.response.data.message[0].message);
          });
      }
    },
    delPointLine(id) {
      var delpoint = Array();
      this.line.points.map(function (item) {
        delpoint.push(item.id);
      });
      this.$http
        .put(`lines/${this.form.id}/points/detach`, {
          points: delpoint,
        })
        .then((res) => {
          console.log(res);
          if (this.form.points.length > 0) {
            this.addPointLine(id);
          } else {
            barramento.$emit("loadMain", false);
            $("#modalLine").modal("hide");
          }
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
          $("#modalLine").modal("hide");
          console.log(error.response);
          alert(error.response.data.message[0].message);
        });
    },
    update(value) {
      if (
        value.number == this.line.number &&
        value.sense == this.line.sense &&
        value.description == this.line.description &&
        this.inputFile &&
        this.compare()
      ) {
        $("#modalLine").modal("hide");
        alert("Os dados não foram alterados!");
      } else {
        barramento.$emit("loadMain", true);
        this.$http
          .put(`lines/${value.id}`, {
            number: value.number,
            sense: value.sense,
            description: value.description.toUpperCase(),
            route: this.form.fileData,
            // points: this.form.points
          })
          .then((res) => {
            console.log(res);
            this.message =
                "Linha " +
                this.form.number +
                " - " +
                this.form.description +
                " - " +
                this.form.sense +
                " editado com sucesso! Esse aviso será encerrado em ";
            if (this.line.points.length > 0) {
              // alert("Os dados foram alterados!detach");
              this.delPointLine(value.id);
            } else {
              // alert("Os dados foram alterados!sync");
              this.addPointLine(value.id);
            }
          })
          .catch(function (error) {
            barramento.$emit("loadMain", false);
            console.log(error);
          });
      }
    },
    // Função para deletar parada passando id como parametro
    delPoint(value) {
      let array = this.form.points;

      //retorna a posição do array
      let result = array.indexOf(value);
      //exclui o elemento do array
      array.splice(result, 1);
      //atualiza o array que é utilizado na função update
      this.form.points = array;

      let point = this.items;

      point.splice(result, 1);

      this.items = point;
    },
    // A função preparar um array para receber o id dos pontos da rota
    getPointLine(line) {
      let array = [];
      line.points.map(function (item) {
        array.push(item.id);
      });
      this.form.points = array;
    },
    //Verificar se houve alteração nas paradas
    compare() {
      let arr0 = [];
      this.value.map(function (item) {
        arr0.push(item.id);
      });
      if (this.form.points.length == arr0.length) {
        for (var i = 0; i < arr0.length; i++) {
          if (!(this.form.points[i] == arr0[i])) {
            this.form.points = arr0;
            return false;
          }
        }
        return true;
      } else {
        this.form.points = arr0;
        return false;
      }
    },
    //Ler o arquivo csv e guarda os dados
    getFile() {
      var file = event.target.files[0];
      this.inputFile = true;
      if (event.target.files[0]) {
        this.inputFile = false;
        this.file = file.name;

        let results;

        this.$papa.parse(file, {
          dynamicTyping: true,
          header: true,
          complete: function (data) {
            results = data.data;
          },
        });

        setTimeout(() => {
          var route = Array();
          results.map(function (item) {
            if (item.LAT && item.LONG) {
              route.push([item.LAT, item.LONG]);
            }
          });
          this.form.fileData = route;
          this.file =
            file.name + " " + this.form.fileData.length + " pontos lidos!";
        }, 2000);
      }
    },
  },
  watch: {
    points(v1) {
      var obj = v1.map(function (item) {
        return {
          id: item.id,
          text: item.number + " " + item.address + " - " + item.sense,
        };
      });
      this.data = obj;
    },
  },
};
</script>
<style>
.custom-file-label::after {
  content: none !important;
}
</style>