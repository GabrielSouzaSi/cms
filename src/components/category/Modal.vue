<template>
  <div>
    <b-modal id="modal-1" title="Categoria" hide-footer>
      <b-container>
        <b-form @submit.stop.prevent="onSubmit">
          <b-row>
            <b-col>
              <b-form-group
                id="example-input-group-1"
                label="Nome"
                label-for="example-input-1"
              >
                <b-form-input
                  id="example-input-1"
                  name="example-input-1"
                  v-model="$v.form.name.$model"
                  :state="validateState('name')"
                  aria-describedby="input-1-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-1-live-feedback"
                  >Nome da categoria obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>

              <b-form-group
                id="example-input-group-2"
                label="Description"
                label-for="example-input-2"
              >
                <b-form-input
                  id="example-input-2"
                  name="example-input-2"
                  v-model="$v.form.description.$model"
                  :state="validateState('description')"
                  aria-describedby="input-2-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-2-live-feedback"
                  >Descrição da categoria obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>
              <b-form-group
                id="example-input-group-3"
                label="Color"
                label-for="example-input-3"
              >
                <b-form-input
                  id="example-input-3"
                  name="example-input-3"
                  type="color"
                  v-model="$v.form.color.$model"
                  :state="validateState('color')"
                  aria-describedby="input-3-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-3-live-feedback"
                  >Cor da categoria obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>
          </b-row>

          <b-row align-h="between" class="text-center mt-3">
            <b-col cols="6">
              <b-button b-button block variant="danger" @click="resetForm()"
                >Cancelar</b-button
              >
            </b-col>
            <b-col cols="6">
              <b-button v-if="!form.id" type="submit" block variant="success"
                >Salvar</b-button
              >
              <b-button
                v-else
                type="button"
                @click="upCategory()"
                block
                variant="success"
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
  data() {
    return {
      form: {
        id: null,
        name: null,
        description: null,
        color: null,
      },
    };
  },
  validations: {
    form: {
      description: {
        required,
      },
      name: {
        required,
      },
      color: {
        required,
      },
    },
    data: [],
  },
  created() {
    barramento.$on("mCategory", (data) => {
      this.data = data;
      data ? (this.form = JSON.parse(JSON.stringify(data))) : this.resetForm();
      this.$bvModal.show("modal-1");
    });
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        id: null,
        name: null,
        description: null,
        color: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
        this.$bvModal.hide("modal-1");
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.$bvModal.hide("modal-1");
        barramento.$emit("loadMain", true);
        this.$http
          .post("categories", {
            name: this.form.name,
            description: this.form.description,
            color: this.form.color,
          })
          .then((res) => {
            console.log(res.data);
            barramento.$emit("loadMain", false);
            barramento.$emit(
              "upData",
              "Categoria " +
                this.form.name +
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
    upCategory() {
      this.$bvModal.hide("modal-1");
      barramento.$emit("loadMain", true);
      // verifica se houve alguma alteração
      if (
        this.form.id == this.data.id &&
        this.form.name == this.data.name &&
        this.form.description == this.data.description &&
        this.form.color == this.data.color
      ) {
        this.resetForm();
        barramento.$emit("loadMain", false);
        barramento.$emit(
          "alertCategory",
          "Os dados não foram alterados! Esse aviso será encerrado em "
        );
      } else {
        this.$http
          .put(`categories/${this.form.id}`, {
            name: this.form.name,
            description: this.form.description,
            color: this.form.color,
          })
          .then((res) => {
            console.log(res.data);
            barramento.$emit("loadMain", false);
            barramento.$emit(
              "upData",
              "Categoria " +
                this.form.name +
                " editado com sucesso! Esse aviso será encerrado em "
            );
            this.resetForm();
          })
          .catch(function (error) {
            // add alert error
            barramento.$emit("loadMain", false);
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
</style>