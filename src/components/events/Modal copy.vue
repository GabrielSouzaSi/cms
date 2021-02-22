<template>
  <!-- The Modal -->
  <div id="event" class="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Evento</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form action>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="event"></label>
                  <input
                    type="text"
                    class="form-control"
                    id="event"
                    placeholder="Nome do Evento"
                    name="event"
                    v-model.trim="form.name"
                    required
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
                    v-model.trim="form.description"
                    placeholder="Descrição..."
                    rows="2"
                    max-rows="3"
                  ></b-form-textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="img"></label>
                  <input
                    type="text"
                    class="form-control"
                    id="img"
                    placeholder="Imagem"
                    name="img"
                    v-model.trim="form.img"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="local"></label>
                  <input
                    type="text"
                    class="form-control"
                    id="local"
                    placeholder="Nome Do Local"
                    name="local"
                    v-model.trim="form.local"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="adress"></label>
                  <input
                    type="text"
                    class="form-control"
                    id="adress"
                    placeholder="Endereço"
                    name="adress"
                    v-model.trim="form.adress"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="date">Data Do Evento</label>
                  <input
                    type="date"
                    class="form-control"
                    id="date"
                    placeholder="Data Do Evento"
                    name="date"
                    v-model="form.date"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="startTime">Horário Início</label>
                  <input
                    type="time"
                    min="00:00"
                    max="24:00"
                    class="form-control"
                    id="startTime"
                    name="startTime"
                    v-model="form.startTime"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="endTime">Horério Final</label>
                  <input
                    type="time"
                    class="form-control"
                    id="endTime"
                    name="endTime"
                    v-model="form.endTime"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="dropdown">
                  <button
                    id="category"
                    type="button"
                    v-bind:style="{background:form.category[0].color}"
                    class="btn btn-block text-white dropdown-toggle"
                    data-toggle="dropdown"
                  >Categoria {{form.category[0].name}}</button>
                  <div class="dropdown-menu w-100">
                    <a
                      class="dropdown-item"
                      v-for="(value, index) in category"
                      :key="index"
                      @click="getCategory(value)"
                    >
                      {{value.name}}
                      <b-icon
                        icon="square"
                        font-scale="1.5"
                        v-bind:style="{background :value.color, color:value.color}"
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
            <button type="button" class="btn btn-danger btn-block" data-dismiss="modal">Cancelar</button>
          </div>
          <div class="col">
            <button
              v-if="add"
              type="button"
              class="btn btn-success btn-block"
              @click="addEvent(form)"
            >Salvar</button>
            <button
              v-else
              type="button"
              class="btn btn-success btn-block"
              @click="upEvent(form)"
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
    data: {
      type: Array
    }
  },
  data() {
    return {
      add: null,
      items: [],
      form: {
        id: null,
        name: "",
        description: "",
        img: "",
        local: "",
        adress: "",
        date: "",
        startTime: "",
        endTime: "",
        category: [
          {
            id: null,
            name: "",
            description: "",
            color: ""
          }
        ]
      },
      category: [
        {
          id: 1,
          name: "Cultura",
          description: "Descrição",
          color: "#00a3c0"
        },
        {
          id: 2,
          name: "Social",
          description: "Descrição",
          color: "#febd11"
        },
        {
          id: 3,
          name: "Saúde",
          description: "Descrição",
          color: "#6ab051"
        }
      ]
    };
  },
  created() {
    barramento.$on("mEvent", data => {
      // console.log(data);
      if (data) {
        let event = JSON.parse(JSON.stringify(data));
        this.items = event;
        this.showEvent(data);
        $("#event").modal();
      } else {
        this.showEvent(data);
        $("#event").modal();
      }
    });
  },
  methods: {
    getCategory(data) {      
      $("#category").removeClass("bg-secondary");
      let arr = [];
      arr.push(data)
      this.form.category = arr;
    },
    showEvent(value) {
      if (value) {
        if(!(value.category[0].id))$("#category").removeClass("bg-secondary");
        this.add = false;
        this.form = value;
      } else {
        document.querySelector("#category").classList.add("bg-secondary");
        this.add = true;
        this.form.id = Math.floor(Math.random() * 100);
        this.form.name = "Ação Cultural ";
        this.form.description =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
        this.form.img = "/img/Teatro%20Municipal.jpg";
        this.form.local = "Teatro Municipal";
        this.form.adress =
          "Av. Glaycon de Paiva - São Vicente, Boa Vista - RR, 69304-360";
        this.form.date = "2020-05-18";
        this.form.startTime = "18:00";
        this.form.endTime = "20:00";
        // this.form.category[0].id = this.form.category[0].id;
        // this.form.category[0].name = this.form.category[0].name;
        // this.form.category[0].description = this.form.category[0].description;
        // this.form.category[0].color = this.form.category[0].color;
      }
    },
    upEvent(value) {
      console.log(value, this.items);
      
      if (
        this.items.id == value.id &&
        this.items.name == value.name &&
        this.items.description == value.description &&
        this.items.img == value.img &&
        this.items.local == value.local &&
        this.items.adress == value.adress &&
        this.items.date == value.date &&
        this.items.startTime == value.startTime &&
        this.items.endTime == value.endTime &&
        this.items.category[0].id == value.category[0].id
      ) {
        $("#event").modal("hide");
        barramento.$emit(
          "alertEvent",
          "Os dados não foram alterados! Esse aviso será encerrado em "
        );
      } else {
        let data = this.data.map(item =>
          item.id == value.id
            ? {
                ...item,
                id: value.id,
                name: value.name,
                description: value.description,
                img: value.img,
                local: value.local,
                adress: value.adress,
                date: value.date,
                startTime: value.startTime,
                endTime: value.endTime,
                category: value.category
              }
            : item
        );        
        barramento.$emit("upTableEvent", data);
        $("#event").modal("hide");
        // this.$http
        //   .put(`event/${value.id}`, {
        //     name: value.name,
        //     description: value.description,
        //     color: value.color
        //   })
        //   .then(res => {
        //     console.log(res.data);
        //     $("#editPoint").modal("hide");
        //     barramento.$emit(
        //       "edited",
        //       "Parada " +
        //         value.number +
        //         " editado com sucesso! Esse aviso será encerrado em "
        //     );
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });
      }
    },
    addEvent(value) {
      $("#event").modal("hide");
      let data = [...this.data, value];
      barramento.$emit("createTable", data);
      // this.$http
      //   .post("category", {
      //     name: value.name,
      //     description: value.description,
      //     color: value.color
      //   })
      //   .then(res => {
      //     $("#category").modal("hide");
      // barramento.$emit(
      //   "alertCategory",
      //   "Parada Nº" +
      //     res.data.number +
      //     " criado com sucesso! Esse aviso será encerrado em "
      // );
      //   })
      //   .catch(function(error) {
      //     console.log(error.response);
      //     alert(error.response.data.message[0].message);
      //   });
    }
  }
};
</script>

<style>
</style>