<template>
  <div>
    <b-modal
      id="editPoint"
      size="lg"
      title="Ponto de Ônibus"
      centered
      hide-footer
    >
      <b-container>
        <b-form @submit.stop.prevent="addPoint">
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
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                id="address-input-group"
                label="Endereço"
                label-for="address"
              >
                <b-form-input
                  id="address"
                  name="address"
                  v-model="$v.form.address.$model"
                  :state="validateState('address')"
                  aria-describedby="validAddress"
                ></b-form-input>

                <b-form-invalid-feedback id="validAddress"
                  >Campo obrigatório!</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="district-input-group"
                label="Bairro"
                label-for="district"
              >
                <b-form-input
                  id="district"
                  name="district"
                  v-model="$v.form.district.$model"
                  :state="validateState('district')"
                  aria-describedby="validDistrict"
                ></b-form-input>

                <b-form-invalid-feedback id="validDistrict"
                  >Campo obrigatório!</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                id="lat-input-group"
                label="Latitude"
                label-for="lat"
              >
                <b-form-input
                  id="lat"
                  name="lat"
                  v-model="$v.form.lat.$model"
                  :state="validateState('lat')"
                  aria-describedby="validLat"
                ></b-form-input>

                <b-form-invalid-feedback id="validLat"
                  >No mínimo 7 caracteres!</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="lgt-input-group"
                label="Longitude"
                label-for="lgt"
              >
                <b-form-input
                  id="lgt"
                  name="lgt"
                  v-model="$v.form.lgt.$model"
                  :state="validateState('lgt')"
                  aria-describedby="validLgt"
                ></b-form-input>

                <b-form-invalid-feedback id="validLat"
                  >No mínimo 7 caracteres!</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group label="É climatizado?">
                <b-form-checkbox
                  id="checkbox-climatizado"
                  name="climatizado"
                  value="true"
                  v-model="form.climatizado"
                  unchecked-value="false"
                  >Sim</b-form-checkbox
                >
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
import { required, minLength } from "vuelidate/lib/validators";
import barramento from "@/eventBus/barramento";

export default {
  mixins: [validationMixin],
  data() {
    return {
      point: null,
      pointB: null,
      form: {
        id: null,
        number: null,
        address: null,
        district: null,
        lat: null,
        lgt: null,
        climatizado: false,
      },
    };
  },
  validations: {
    form: {
      number: {
        required,
      },
      address: {
        required,
      },
      district: {
        required,
      },
      lat: {
        required,
        minLength: minLength(7),
      },
      lgt: {
        required,
        minLength: minLength(7),
      },
    },
  },
  created() {
    barramento.$on("point", (point) => {
      // var data = Object.values(point)
      if (point) {
        this.point = point;
        this.form.id = point.id;
        this.form.number = point.number;
        this.form.address = point.address;
        this.form.district = point.district;
        this.form.lat = point.lat;
        this.form.lgt = point.lgt;
        this.form.climatizado = point["air-conditioning"];
      } else {
        this.resetForm();
      }
      this.$bvModal.show("editPoint");
    });
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.$bvModal.hide("editPoint");
      this.form = {
        id: null,
        number: null,
        address: null,
        district: null,
        lat: null,
        lgt: null,
        climatizado: false,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    addPoint() {
      this.$v.form.$touch();
      console.log("adicionar: ", this.form);
      if (!this.$v.form.$anyError) {
        this.$bvModal.hide("editPoint");
        barramento.$emit("loadMain", true);
        this.$http
          .post("points", {
            number: Number(this.form.number),
            address: this.form.address.toUpperCase(),
            district: this.form.district.toUpperCase(),
            lat: this.form.lat,
            lgt: this.form.lgt,
            "air-conditioning": this.form.climatizado,
          })
          .then((res) => {
            barramento.$emit("upPoints");
            barramento.$emit(
              "creatPoint",
              "Parada Nº" +
                res.data.number +
                " criado com sucesso! Esse aviso será encerrado em "
            );
          })
          .catch(function (error) {
            barramento.$emit("loadMain", false);
            console.log(error.response);
            alert(error.response.data.message[0].message);
          });
      }
    },
    update() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;
      console.log("atualizar!");
      this.form.climatizado == "true" ? (this.pointB = 1) : (this.pointB = 0);
      if (
        this.form.number == this.point.number &&
        this.form.address == this.point.address &&
        this.form.district == this.point.district &&
        this.form.lat == this.point.lat &&
        this.form.lgt == this.point.lgt &&
        this.form.climatizado == this.point["air-conditioning"]
      ) {
        this.$bvModal.hide("editPoint");
        barramento.$emit(
          "alert",
          "Os dados não foram alterados! Esse aviso será encerrado em "
        );
      } else {
        let formData = new FormData();
        formData.append("number", this.form.number),
          formData.append("address", this.form.address),
          formData.append("district", this.form.district),
          formData.append("lat", Number(this.form.lat)),
          formData.append("lgt", Number(this.form.lgt)),
          formData.append("air-conditioning", this.pointB),
          formData.append("_method", "PUT"),
          this.$http
            .post(`points/${this.form.id}`, formData)
            .then((res) => {
              console.log(res.data);
              this.$bvModal.hide("editPoint");
              barramento.$emit("upPoints");
              barramento.$emit(
                "edited",
                "Parada " +
                  this.form.number +
                  " editado com sucesso! Esse aviso será encerrado em "
              );
            })
            .catch(function (error) {
              barramento.$emit("loadMain", false);
              console.log(error.response);
              alert(error.response.data.message[0].message);
            });
      }
    },
  },
};
</script>