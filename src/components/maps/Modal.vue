<template>
  <!-- The Modal -->
  <div id="editPoint" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Ponto de Parada</h4>
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
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="adress">Endereço:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="adress"
                    placeholder="Endereço"
                    name="adress"
                    v-model.trim="form.address"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="district">Bairro:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="district"
                    placeholder="Bairro"
                    name="district"
                    v-model.trim="form.district"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="lat">Latitude:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="lat"
                    placeholder="Latitude"
                    name="lat"
                    v-model="form.lat"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="lgt">Longitude:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="lgt"
                    placeholder="Longitude"
                    name="lgt"
                    v-model="form.lgt"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label>É Climatizado?</label>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="optradio"
                      v-model="form.climatizado"
                      value="true"
                    />Sim
                  </label>
                </div>
              </div>
              <div class="col-2">
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="optradio"
                      v-model="form.climatizado"
                      value="false"
                    />Não
                  </label>
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
              @click="addPoint(form)"
            >
              Salvar
            </button>
            <button
              v-else
              type="button"
              class="btn btn-success btn-block"
              @click="update(form)"
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
      map: null,
      loader: null,
      point: null,
      pointB: null,
      add: false,
      form: {
        id: null,
        number: null,
        address: "",
        district: "",
        lat: "",
        lgt: "",
        climatizado: null,
      },
    };
  },
  created() {
    barramento.$on("point", (point) => {
      // var data = Object.values(point)
      // console.log(point);

      if (point) {
        this.add = false;
        this.point = point;
        this.form.id = point.id;
        this.form.number = point.number;
        this.form.address = point.address;
        this.form.district = point.district;
        this.form.lat = point.lat;
        this.form.lgt = point.lgt;
        this.form.climatizado = point["air-conditioning"];
      } else {
        this.add = true;
        this.form.id = null;
        this.form.number = null;
        this.form.address = "";
        this.form.district = "";
        this.form.lat = "";
        this.form.lgt = "";
        this.form.climatizado = null;
      }
      $("#editPoint").modal();
    });
  },
  methods: {
    update(value) {
      console.log("atualizar!");
      value.climatizado == "true" ? (this.pointB = 1) : (this.pointB = 0);
      console.log(value, this.pointB);
      if (
        value.number == this.point.number &&
        value.address == this.point.address &&
        value.district == this.point.district &&
        value.lat == this.point.lat &&
        value.lgt == this.point.lgt &&
        value.climatizado == this.point["air-conditioning"]
      ) {
        $("#editPoint").modal("hide");
        barramento.$emit(
          "alert",
          "Os dados não foram alterados! Esse aviso será encerrado em "
        );
      } else {
        let formData = new FormData();
        formData.append("number", value.number),
          formData.append("address", value.address),
          formData.append("district", value.district),
          formData.append("lat", value.lat),
          formData.append("lgt", value.lgt),
          formData.append("air-conditioning", this.pointB),
          formData.append("_method", "PUT"),
          this.$http.post(`points/${value.id}`, formData).then((res) => {
            console.log(res.data);
            $("#editPoint").modal("hide");
            barramento.$emit(
              "edited",
              "Parada " +
                value.number +
                " editado com sucesso! Esse aviso será encerrado em "
            );
          })
        .catch(function (error) {
          console.log(error.response);
          alert(error.response.data.message[0].message);
        });
      }
    },
    addPoint(value) {
      console.log(value);
      this.$http
        .post("points", {
          number: value.number,
          address: value.address,
          district: value.district,
          lat: value.lat,
          lgt: value.lgt,
          "air-conditioning": Boolean(value.climatizado),
        })
        .then((res) => {
          $("#editPoint").modal("hide");
          barramento.$emit(
            "creatPoint",
            "Parada Nº" +
              res.data.number +
              " criado com sucesso! Esse aviso será encerrado em "
          );
        })
        .catch(function (error) {
          console.log(error.response);
          alert(error.response.data.message[0].message);
        });
    },
  },
};
</script>

<style>
</style>