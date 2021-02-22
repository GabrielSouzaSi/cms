<template>
  <!-- The Modal -->
  <div id="category" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Categoria</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form action>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="category"></label>
                  <input
                    type="text"
                    id="category"
                    class="form-control"
                    placeholder="Nome"
                    name="category"
                    v-model="form.name"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="description"></label>
                  <b-form-textarea
                    id="description"
                    v-model="form.description"
                    placeholder="Descrição..."
                    rows="2"
                    max-rows="3"
                  ></b-form-textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="dropdown mt-3 pb-3">
                  <button
                    id="color"
                    type="button"
                    v-bind:style="{ background: form.color }"
                    class="btn btn-block text-white dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Selecionar Cor
                  </button>
                  <div class="dropdown-menu w-100">
                    <a
                      class="dropdown-item"
                      v-for="(value, index) in color"
                      :key="index"
                      @click="getColor(value.color)"
                    >
                      {{ value.color }}
                      <b-icon
                        icon="square"
                        font-scale="1.5"
                        v-bind:style="{
                          background: value.color,
                          color: value.color,
                        }"
                      ></b-icon>
                    </a>
                  </div>
                </div>
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
              data-dismiss="modal"
            >
              Cancelar
            </button>
          </div>
          <div class="col">
            <button
              v-if="add"
              type="button"
              class="btn btn-success btn-block"
              @click="addCategory(form)"
            >
              Salvar
            </button>
            <button
              v-else
              type="button"
              class="btn btn-success btn-block"
              @click="upCategory(form)"
            >
              Salvar
            </button>
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
    data: {
      type: Array,
    },
  },
  data() {
    return {
      add: null,
      items: [],
      form: {
        id: null,
        name: "",
        description: "",
        color: "",
      },
      color: [
        { color: "#009f57" },
        { color: "#00a3c0" },
        { color: "#febd11" },
        { color: "#00a3bf" },
      ],
      erros: [],
    };
  },
  created() {
    barramento.$on("mCategory", (data) => {
      this.items = JSON.parse(JSON.stringify(data));
      this.showCategory(data);
      $("#category").modal();
    });
  },
  methods: {
    validForma() {
      this.erros = [];
      if (this.form.name == "")
        this.erros.push("Nome da categoria não informado.");
      if (this.form.description == "")
        this.erros.push("Descrição da categoria não informado.");
      if (this.form.name && this.form.description && this.form.color)
        return true;
    },
    getColor(color) {
      $("#color").removeClass("bg-secondary");
      this.form.color = color;
    },
    showCategory(data) {
      if (data) {
        $("#color").removeClass("bg-secondary");
        this.add = false;
        this.form = data;
      } else {
        document.querySelector("#color").classList.add("bg-secondary");
        this.add = true;
        this.form.id = Math.floor(Math.random() * 100);
        this.form.name = "";
        this.form.description = "Lorem Ipsum is simply dummy text";
        this.form.color = "";
      }
    },
    upCategory(value) {
      barramento.$emit("loadMain", true);
      // verifica se houve alguma alteração
      if (
        value.name == this.items.name &&
        value.description == this.items.description &&
        value.color == this.items.color
      ) {
        $("#category").modal("hide");
        barramento.$emit("loadMain", false);
        barramento.$emit(
          "alertCategory",
          "Os dados não foram alterados! Esse aviso será encerrado em "
        );
      } else {
        $("#category").modal("hide");
        this.$http
          .put(`categories/${value.id}`, {
            name: value.name,
            description: value.description,
            color: value.color,
          })
          .then((res) => {
            console.log(res.data);
            barramento.$emit("loadMain", false);
            barramento.$emit(
              "upData",
              "Categoria " +
                value.name +
                " editado com sucesso! Esse aviso será encerrado em "
            );
          })
          .catch(function (error) {
            // add alert error
            barramento.$emit("loadMain", false);
            console.log(error);
          });
      }
    },
    addCategory(value) {
      if (this.validForma()) {
        $("#category").modal("hide");
        barramento.$emit("loadMain", true);
        // let data = [...this.data, value];
        // barramento.$emit("createTable", data);
        this.$http
          .post("categories", {
            name: value.name,
            description: value.description,
            color: value.color,
          })
          .then((res) => {
            console.log(res.data);
            barramento.$emit("loadMain", false);
            barramento.$emit(
              "upData",
              "Categoria " +
                value.name +
                " adicionado com sucesso! Esse aviso será encerrado em "
            );
          })
          .catch(function (error) {
            barramento.$emit("loadMain", false);
            console.log(error);
            // console.log(error.response);
            // alert(error.response.data.message[0].message);
          });
      }
    },
  },
};
</script>

<style>
</style>