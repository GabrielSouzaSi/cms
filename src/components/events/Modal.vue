<template>
  <div>
    <b-modal
      id="modalEvent"
      size="xl"
      title="Evento"
      hide-footer
      no-close-on-backdrop
    >
      <b-container>
        <b-form @submit.stop.prevent="onSubmit">
          <b-row>
            <b-col>
              <b-form-group id="field1" label="Nome" label-for="EditFormEvent1">
                <b-form-input
                  id="EditFormEvent1"
                  name="EditFormEvent1"
                  v-model="$v.form.name.$model"
                  :state="validateState('name')"
                  aria-describedby="EditFormEvent-i1"
                ></b-form-input>

                <b-form-invalid-feedback id="EditFormEvent-i1"
                  >Nome do Evento obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>

              <b-form-group
                id="field2"
                label="Descrição"
                label-for="EditFormEvent2"
              >
                <b-form-input
                  id="EditFormEvent2"
                  name="EditFormEvent2"
                  v-model="$v.form.description.$model"
                  :state="validateState('description')"
                  aria-describedby="EditFormEvent-i2"
                ></b-form-input>

                <b-form-invalid-feedback id="EditFormEvent-i2"
                  >Descrição do Evento obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>

              <!-- <div v-if="form.img_file" v-html="img"></div> -->
              <!-- <img :src="form.img_file" class="rounded" width="300" height="250" /> -->

              <div class="mt-3">
                <b-button
                  v-if="!form.img_file"
                  @click="upFile()"
                  variant="success"
                  >Adicionar Imagem</b-button
                >
                <b-button v-else @click="upFile()" variant="success"
                  >Atualizar Imagem</b-button
                >
              </div>

              <b-input-group class="mb-3">
                <b-form-file
                  hidden
                  accept="image/*"
                  id="field3"
                  class="mt-2"
                  plain
                  @change="image"
                  v-model="$v.form.img_file.$model"
                  :state="validateState('img_file')"
                  aria-describedby="EditFormEvent-i3"
                ></b-form-file>
                <b-form-invalid-feedback id="EditFormEvent-i3"
                  >Imagem do Evento obrigatório.</b-form-invalid-feedback
                >
              </b-input-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                id="field4"
                label="Local"
                label-for="EditFormEvent4"
              >
                <b-form-input
                  id="EditFormEvent4"
                  name="EditFormEvent4"
                  v-model="$v.form.place.$model"
                  :state="validateState('place')"
                  aria-describedby="EditFormEvent-i4"
                ></b-form-input>

                <b-form-invalid-feedback id="EditFormEvent-i4"
                  >Local do Evento obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                id="field5"
                label="Endereço"
                label-for="EditFormEvent5"
              >
                <b-form-input
                  id="EditFormEvent5"
                  name="EditFormEvent5"
                  v-model="$v.form.address.$model"
                  :state="validateState('address')"
                  aria-describedby="EditFormEvent-i5"
                ></b-form-input>

                <b-form-invalid-feedback id="EditFormEvent-i5"
                  >Endereço do Evento obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                id="field6"
                label="Data do Evento"
                label-for="EditFormEvent6"
              >
                <b-form-input
                  id="EditFormEvent6"
                  name="EditFormEvent6"
                  type="date"
                  v-model="$v.form.date.$model"
                  :state="validateState('date')"
                  aria-describedby="EditFormEvent-i6"
                ></b-form-input>

                <b-form-invalid-feedback id="EditFormEvent-i6"
                  >Data do Evento obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                id="field7"
                label="Horário Início"
                label-for="EditFormEvent7"
              >
                <b-form-input
                  id="EditFormEvent7"
                  name="EditFormEvent7"
                  type="time"
                  v-model="$v.form.starts_at.$model"
                  :state="validateState('starts_at')"
                  aria-describedby="EditFormEvent-i7"
                ></b-form-input>

                <b-form-invalid-feedback id="EditFormEvent-i7"
                  >Horário de início do Evento
                  obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                id="field8"
                label="Horário Final"
                label-for="EditFormEvent8"
              >
                <b-form-input
                  id="EditFormEvent8"
                  name="EditFormEvent8"
                  type="time"
                  v-model="$v.form.ends_at.$model"
                  :state="validateState('ends_at')"
                  aria-describedby="EditFormEvent-i8"
                ></b-form-input>

                <b-form-invalid-feedback id="EditFormEvent-i8"
                  >Horário final do Evento obrigatório.</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                id="field9"
                label="Categoria"
                label-for="EditFormEvent9"
              >
                <b-form-select
                  v-model="$v.form.category_id.$model"
                  :options="category"
                  id="EditFormEvent9"
                  value-field="id"
                  text-field="name"
                  :state="validateState('category_id')"
                  aria-describedby="EditFormEvent-i9"
                  disabled-field="notEnabled"
                  @change="formSelect"
                ></b-form-select>
              </b-form-group>
              <b-badge
                v-if="form.category_id"
                v-bind:style="{
                  background: badge.color,
                  color: 'white',
                }"
              >
                <b-icon icon="tag-fill"></b-icon>
                {{ badge.name }}
              </b-badge>
              <b-form-invalid-feedback id="EditFormEvent-i9">
                Categoria do Evento obrigatório.
              </b-form-invalid-feedback>
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
                @click="upEvent()"
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
  props: {
    category: Array,
  },
  data() {
    return {
      badge: {
        name: null,
        color: null,
      },
      img: null,
      form: {
        id: null,
        name: null,
        description: null,
        img_file: null,
        place: null,
        address: null,
        date: null,
        starts_at: null,
        ends_at: null,
        category_id: null,
      },
      urlImg: null,
      data: null,
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
      category_id: {
        required,
      },
      img_file: {
        required,
      },
      place: {
        required,
      },
      address: {
        required,
      },
      date: {
        required,
      },
      starts_at: {
        required,
      },
      ends_at: {
        required,
      },
    },
    data: [],
  },
  created() {
    barramento.$on("modalFormEvent", (data) => {
      this.data = data;
      data ? this.editEvent(data) : this.$bvModal.show("modalEvent");
    });
  },
  methods: {
    upFile() {
      document.getElementById("field3").click();
    },
    formSelect(event) {
      var badge = this.category.find((item) => item.id == event);
      this.badge.name = badge.name;
      this.badge.color = badge.color;
    },
    image(event) {
      this.form.img_file = event.target.files[0];
      // console.log(event.target.files[0]);
      this.urlImg = URL.createObjectURL(event.target.files[0]);
      this.img =
        "<img src='" +
        this.urlImg +
        "' class='rounded' width='300' height='250' />";
    },
    editEvent(data) {
      // let img = data.img.split('/', 5)
      // this.img = "<img src='" + process.env.VUE_APP_URL + data.img + "' class='rounded' width='300' height='250' id='image' value='"+ img[4] +"' />";
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.description = data.description;
      // let url = process.env.VUE_APP_URL + data.img;
      // this.form.img_file = img[4];
      this.form.img_file = data.img;
      this.form.place = data.place;
      this.form.address = data.address;
      this.form.date = data.date;
      this.form.starts_at = data.starts_at;
      this.form.ends_at = data.ends_at;
      this.form.category_id = data.category.id;
      this.formSelect(data.category_id);
      this.$bvModal.show("modalEvent");
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        id: null,
        name: null,
        description: null,
        img_file: null,
        place: null,
        address: null,
        date: null,
        starts_at: null,
        ends_at: null,
        category_id: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
        this.$bvModal.hide("modalEvent");
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.$bvModal.hide("modalEvent");
        barramento.$emit("loadMain", true);
        const formData = new FormData();
        formData.append("img_file", this.form.img_file);
        formData.append("name", this.form.name);
        formData.append("description", this.form.description);
        formData.append("place", this.form.place);
        formData.append("date", this.form.date);
        formData.append("address", this.form.address);
        formData.append("starts_at", this.form.starts_at.slice(0, 5));
        formData.append("ends_at", this.form.ends_at.slice(0, 5));
        formData.append("category_id", this.form.category_id);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Accept: "application/json",
          },
        };
        this.$http
          .post("events", formData, config)
          .then((res) => {
            barramento.$emit("loadMain", false);
            barramento.$emit(
              "createEvent",
              "Evento " +
                this.form.name +
                " Evento criado com sucesso! Esse aviso será encerrado em "
            );
            console.log(res.data);
          })
          .catch(function (error) {
            barramento.$emit("loadMain", false);
            console.log(error);
            // console.log(error.response);
            // alert(error.response.data.message[0].message);
          });
      }
    },
    upEvent() {
      // verifica se houve alguma alteração
      if (
        this.form.id == this.data.id &&
        this.form.name == this.data.name &&
        this.form.description == this.data.description &&
        this.form.category_id == this.data.category.id &&
        this.form.img_file == process.env.VUE_APP_URL + this.data.img &&
        this.form.place == this.data.place &&
        this.form.address == this.data.address &&
        this.form.date == this.data.date &&
        this.form.starts_at == this.data.start &&
        this.form.ends_at == this.data.end
      ) {
        this.resetForm();
      } else {
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$bvModal.hide("modalEvent");
          barramento.$emit("loadMain", true);

          // const params  = new URLSearchParams();
          const params = new FormData();
          params.append("img_file", this.form.img_file);
          params.append("name", this.form.name);
          params.append("description", this.form.description);
          params.append("place", this.form.place);
          params.append("date", this.form.date);
          params.append("address", this.form.address);
          params.append("starts_at", "10:00");
          params.append("ends_at", "11:00");
          params.append("category_id", this.form.category_id);
          const config = {
            headers: {
              "Content-type": "x-www-form-urlencoded;charset=UTF-8",
              Accept: "application/json",
            },
          };
          this.$http
            .post(`events/${this.form.id}?_method=PUT`, params, config)
            .then((res) => {
              barramento.$emit("loadMain", false);
              barramento.$emit(
                "createEvent",
                "Evento " +
                  this.form.name +
                  " editado com sucesso! Esse aviso será encerrado em "
              );
              console.log(res.data);
            })
            .catch(function (error) {
              barramento.$emit("loadMain", false);
              console.log(error);
              console.log(error.response);
              // console.log(error.response);
              // alert(error.response.data.message[0].message);
            });
        }
        this.resetForm();
      }
    },
  },
};
</script>

<style>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: inherit;
}
</style>