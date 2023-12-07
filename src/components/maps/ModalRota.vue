<template>
  <!-- The Modal -->
  <div>
    <b-modal
      id="editRoute"
      size="xl"
      :title="!form.id ? 'Adicionar Rota' : 'Atualizar Rata'"
      hide-footer
      :no-close-on-backdrop="true"
    >
      <b-container>
        <b-form @submit.stop.prevent="addLine">
          <b-row>
            <b-col>
              <b-form-group
                id="number-input-group"
                label="Número"
                label-for="number"
              >
                <b-form-input
                  id="number"
                  name="number"
                  type="number"
                  v-model="$v.form.number.$model"
                  :state="validateState('number')"
                  aria-describedby="validNumber"
                ></b-form-input>

                <b-form-invalid-feedback id="validNumber"
                  >Campo obrigatório!</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                id="sense-input-group"
                label="Sentido"
                label-for="sense"
              >
                <b-form-select
                  id="sense"
                  name="sense"
                  v-model="$v.form.sense.$model"
                  :state="validateState('sense')"
                  aria-describedby="validsense"
                >
                  <b-form-select-option value="BAIRRO"
                    >BAIRRO</b-form-select-option
                  >
                  <b-form-select-option value="CENTRO"
                    >CENTRO</b-form-select-option
                  >
                </b-form-select>

                <b-form-invalid-feedback id="validSense"
                  >Campo obrigatório!</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                id="description-input-group"
                label="Nome da Rota"
                label-for="description"
              >
                <b-form-input
                  id="description"
                  name="description"
                  v-model="$v.form.description.$model"
                  :state="validateState('description')"
                  aria-describedby="validDescription"
                ></b-form-input>

                <b-form-invalid-feedback id="validDescription"
                  >Campo obrigatório!</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                id="file-input-group"
                label="Coordenadas da Rota"
                label-for="file"
              >
                <b-form-file
                  id="file"
                  accept=".csv"
                  @change="getFile"
                  :placeholder="file"
                >
                  <template slot="file-name" slot-scope="{ names }">
                    <b-badge variant="secondary" class="mr-2"
                      >{{ names[0] ? "":"" }}{{ file }}</b-badge
                    >
                    <b-badge variant="primary" v-if="loadedFile">
                      <b-spinner small type="grow"></b-spinner>
                      Carregando...
                    </b-badge>
                  </template>
                </b-form-file>
                <!-- <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    accept=".csv"
                    @change="getFile"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label class="custom-file-label" for="inputGroupFile01">{{
                    file
                  }}</label>
                </div> -->
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                id="points-input-group"
                label="Selecionar Ponto de ônibus"
                label-for="points"
              >
                <multiselect
                  v-model="value"
                  :options="data"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="false"
                  placeholder="Clique aqui!"
                  label="text"
                  track-by="id"
                  selectLabel="Clique para selecionar"
                  selectedLabel="Selecionado"
                  deselectLabel="Clique para remover"
                  :preselect-first="false"
                >
                  <template slot="selection" slot-scope="{ values, isOpen }">
                    <span
                      class="multiselect__single"
                      v-if="(values.length &amp;&amp; !isOpen)"
                      >{{ value.length }} paradas selecionadas!</span
                    >
                  </template>
                </multiselect>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-button block @click="resetForm()">Cancelar</b-button>
            </b-col>
            <b-col>
              <b-button v-if="!form.id" block type="submit" variant="primary"
                >Salvar</b-button
              >
              <b-button v-else block @click="update()" variant="success"
                >Atualizar</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import barramento from "@/eventBus/barramento";

export default {
  mixins: [validationMixin],
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
      loadedFile: false,
      file: "Selecionar arquivo CSV!",
      inputFile: true,
      form: {
        id: null,
        number: null,
        sense: null,
        description: null,
        fileData: [],
        points: [],
      },
      value: [],
      message: "",
    };
  },
  validations: {
    form: {
      number: {
        required,
      },
      sense: {
        required,
      },
      description: {
        required,
      },
    },
  },
  created() {
    barramento.$on("line", (line) => {
      this.data = this.points?.map((item) => {
        return {
          id: item.id,
          text: item.number + " " + item.address,
        };
      });
      if (line) {
        this.line = line; //pontos da linha
        let data = JSON.parse(JSON.stringify(line));
        this.value = data.points.map((item) => {
          return {
            id: item.id,
            text: item.number + " " + item.address,
          };
        });
        this.form.id = data.id;
        this.form.number = data.number;
        this.form.sense = data.sense;
        this.form.description = data.description;
        this.form.fileData = data.route;
        this.file = data.route.length + " pontos totais!";
      } else {
        this.resetForm();
      }
      this.$bvModal.show("editRoute");
    });
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.$bvModal.hide("editRoute");
      this.file = "Selecionar arquivo CSV!";
      this.value = [];
      this.form = {
        id: null,
        number: null,
        sense: null,
        description: null,
        fileData: [],
        points: [],
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    addLine() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;
      barramento.$emit("loadMain", true);
      this.compare();
      this.$http
        .post("lines", {
          number: this.form.number,
          sense: this.form.sense.toUpperCase(),
          description: this.form.description.toUpperCase(),
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
          alert("Id: " + res.data.id);
          this.addPointLine(res.data.id);
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
          alert(error.response.data);
        });
    },
    addPointLine(id) {
      if (this.value.length < 1) {
        this.$bvModal.hide("editRoute");
        barramento.$emit("loadMain", false);
        barramento.$emit("creatPoint", this.message);
        console.log("Não tem parada!");
      } else {
        this.$http
          .put(`lines/${id}/points/sync`, {
            points: this.form.points,
          })
          .then((res) => {
            if(res){
            this.$bvModal.hide("editRoute");
            barramento.$emit("loadMain", false);
            barramento.$emit("creatPoint", this.message);}
          })
          .catch(function (error) {
            this.$bvModal.hide("editRoute");
            barramento.$emit("loadMain", false);
            console.log(error.response);
            alert(error.response.data.message[0].message);
          });
      }
    },
    delPointLine(id) {
      var delpoint = [];
      this.line.points.map((item) => {
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
            this.$bvModal.hide("editRoute");
          }
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
          this.$bvModal.hide("editRoute");
          console.log(error.response);
          alert(error.response.data.message[0].message);
        });
    },
    update() {
      this.$bvModal.hide("editRoute");
      console.log("pointIds" + this.form.points); // Pontos iniciais
      this.getPointLine(JSON.parse(JSON.stringify(this.value))); // pontos alterados ou não
      barramento.$emit("loadMain", true);
      this.$http
        .put(`lines/${this.form.id}`, {
          number: this.form.number,
          sense: this.form.sense.toUpperCase(),
          description: this.form.description.toUpperCase(),
          route: this.form.fileData,
          points: this.form.points,
        })
        .then((res) => {
          if(res){
            this.message =
            "Linha " +
            this.form.number +
            " - " +
            this.form.description +
            " - " +
            this.form.sense +
            " editado com sucesso! Esse aviso será encerrado em ";
          }
          if (this.line.points.length > 0) {
            // alert("Os dados foram alterados!detach");
            this.delPointLine(this.form.id);
          } else {
            // alert("Os dados foram alterados!sync");
            this.addPointLine(this.form.id);
          }
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
          console.log(error);
        });
    },
    // Função para deletar parada passando id como parametro
    delPoint(value) {
      let array = this.form.points;

      //retorna a posição do array
      let result = array.indexOf(value);
      //exclui o elemento do array
      array.splice(result, 1);
      //atualiza o array
      this.form.points = array;
    },
    // A função preparar um array para receber o id dos pontos da rota
    getPointLine(points) {
      let array = [];
      points.map((item) => {
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
    getFile(event) {
      // console.log(event);
      this.file = "";
      this.loadedFile = true;
      var file = event.target.files[0];
      this.inputFile = true;
      if (event.target.files[0]) {
        this.inputFile = false;

        let results;

        this.$papa.parse(file, {
          dynamicTyping: true,
          header: true,
          complete: function (data) {
            results = data.data;
          },
        });

        setTimeout(() => {
          var route = [];
          results.map((item) => {
            if (item.LAT && item.LONG) {
              route.push([item.LAT, item.LONG]);
            }
          });
          this.form.fileData = route;
          this.loadedFile = false;
          this.file =
            file.name + " " + this.form.fileData.length + " pontos lidos!";
        }, 2000);
      }
    },
  },
  watch: {
    points(v1) {
      var obj = v1.map((item) => {
        return {
          id: item.id,
          text: item.number + " " + item.address,
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