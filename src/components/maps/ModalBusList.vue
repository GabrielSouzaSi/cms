<template>
  <!-- The Modal -->
  <div id="modalBusList" class="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <!-- <h4 class="modal-title">Ônibus</h4> -->
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div
            style="
              position: relative;
              overflow-y: auto;
              overflow-x: hidden;
              max-height: 500px;
            "
          >
            <form action>
              <div class="row">
                <div class="col">
                  <b-table
                    v-show="bus"
                    :items="bus"
                    :fields="fields"
                    small
                    hover
                    borderless
                    responsive
                    striped
                    class="text-center rounded-lg shadow-lg"
                  >
                    <template v-slot:thead-top>
                      <b-tr>
                        <b-th colspan="12">
                          <b-form-group label="Listagem">
                            <b-button-group size="sm">
                              <b-button variant="primary" @click="show = !show">
                                <b-icon-plus-square></b-icon-plus-square>
                              </b-button>
                            </b-button-group>
                          </b-form-group>
                        </b-th>
                      </b-tr>
                      <b-tr v-show="show">
                        <b-th colspan="12">
                          <div class="mx-auto">
                            <b-input-group size="sm" prepend="Veículo">
                              <b-form-input
                                type="text"
                                id="bus"
                                name="bus"
                                v-model="form.description"
                                style="max-width: 110px"
                              ></b-form-input>
                              <b-input-group-append>
                                <b-button
                                  variant="success"
                                  @click="filterBusList(form)"
                                >
                                  <b-icon-check></b-icon-check>
                                </b-button>
                                <b-button
                                  variant="danger"
                                  @click="show = !show"
                                >
                                  <b-icon-x-square></b-icon-x-square>
                                </b-button>
                              </b-input-group-append>
                            </b-input-group>
                          </div>
                        </b-th>
                      </b-tr>
                    </template>

                    <template v-slot:cell(index)="data">{{
                      data.index + 1
                    }}</template>
                    <template v-slot:cell(bus)="data">{{
                      data.item.description
                    }}</template>

                    <template v-slot:cell(actions)="row">
                      <b-button-group size="sm">
                        <b-button variant="success" @click="row.toggleDetails">
                          <b-icon-dash-circle
                            v-if="row.detailsShowing"
                          ></b-icon-dash-circle>
                          <b-icon-pencil v-else></b-icon-pencil>
                        </b-button>
                        <b-button variant="danger" @click="deleteBus(row.item)">
                          <b-icon-x-square></b-icon-x-square>
                        </b-button>
                      </b-button-group>
                    </template>

                    <template v-slot:row-details="row">
                      <b-input-group size="sm" prepend="Veículo">
                        <b-form-input
                          type="text"
                          v-model="tempBus[row.index].description"
                        ></b-form-input>

                        <b-input-group-append>
                          <b-button v-if="bus" variant="success" @click="filterBusList(tempBus[row.index])">
                            <b-icon-check></b-icon-check>
                          </b-button>
                          <b-button
                            v-else
                            variant="danger"
                            @click="row.toggleDetails"
                          >
                            <b-icon-dash-circle></b-icon-dash-circle>
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </template>
                  </b-table>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import barramento from "@/eventBus/barramento";
import json from "../../busGPS.json";
export default {
  data() {
    return {
      busJsonGPS: json,
      show: false,
      form: {
        description: null,
        idBus: null,
        busId: null,
      },
      fields: [
        {
          key: "index",
          label: "Nº",
        },
        {
          key: "bus",
          label: "Descrição",
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
      bus: [],
      tempBus: [],
      busLocation: null,
    };
  },
  created() {
    barramento.$on("mBusList", () => {
      this.getBusList();
    });
  },
  methods: {
    getBusList() {
      $("#modalBusList").modal("hide");
      barramento.$emit("loadMain", true);
      this.$http
        .get(`bus`)
        .then((res) => {
          this.bus = res.data;
          // console.log(this.bus);
          barramento.$emit("loadMain", false);
          $("#modalBusList").modal();
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
          $("#modalBusList").modal();
          // barramento.$emit("loadMain", false);
          console.log(error);
        });
    },
    createBus() {
      $("#modalBusList").modal("hide");
      barramento.$emit("loadMain", true);
      this.$http
        .post(`bus`, {
          idBus: this.form.busId,
          description: this.form.description.toLocaleUpperCase(),
        })
        .then((res) => {
          console.log(res);
          barramento.$emit("loadMain", false);
          this.getBusList();
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
          $("#modalBusList").modal();
          // barramento.$emit("loadMain", false);
          console.log(error);
        });
    },
    deleteBus(data) {
      confirm("Deseja realmente remover o ônibus " + data.description + "?")
        ? this.delete(data.id)
        : console.log("não!");
    },
    setBus(bus) {
      console.log(bus);
    },
    delete(id) {
      this.$http
        .delete(`bus/${id}`)
        .then((res) => {
          this.getBusList();
          console.log(res);
        })
        .catch(function (error) {
          barramento.$emit("loadMain", false);
          console.log(error);
        });
    },
    //Requisição para obter dados dos onibus com GPS
    busGPS() {
      $("#modalBusList").modal("hide");
      this.$http
        .get(`locations/bus`)
        .then((res) => {
          this.busLocation = res.data;
          console.log(this.busLocation);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    filterBusList(bus) {
      console.log(bus);
      //Filtro para buscar onibus existente na lista
      let data = this.bus.filter((item) => item.description === bus.description);


      // let gps = this.filterBusGPS(bus.description);

      
      if (data.length > 0 ) {
        //Verifica se existe onibus e se a identifação do gps são os mesmos do arquivo json
        alert("O ônibus informado já existe!");
      } else if(bus.description != this.form.description) {
        //caso a identificação do gps seja diferente é atualizado!        
        // alert("Precisa atualizar");
        this.$http
        .put(`bus/${bus.id}`, {
          idBus: bus.busId,
          description: bus.description,
        })
        .then((res) => {
          console.log(res);
          this.getBusList();
        })
        .catch(function (error) {
        
          // barramento.$emit("loadMain", false);
          console.log(error);
        });
      }else{
        // cadastra um ônibus novo
        // alert("Precisa cadastrar o ônibus!");
        this.createBus();
      }
      
      
    },
    //Filtro para buscar o onibus com gps que o usuario informou
    filterBusGPS(bus) {
      let data = this.busJsonGPS.filter((item) => item.plate === bus);
      return data[0]
    },
  },
  watch: {
    bus(v1) {
      this.tempBus = JSON.parse(JSON.stringify(v1));
    },
  },
};
</script>