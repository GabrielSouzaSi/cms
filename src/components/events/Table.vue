<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      variant="success"
      @dismiss-count-down="countDownChanged"
    >{{alertTitle}} {{ dismissCountDown }} segundos</b-alert>
    <TitleC :title="title" :subTitle="subTitle"/>
    <b-form-group label-align-sm="right" label-size="sm" label-for="filterInput">
      <b-input-group size="sm">
        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Pesquisar"></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-table
      :items="data"
      :fields="fields"
      :filter="filter"
      :filterIncludedFields="filterOn"
      responsive
      hover
      borderless
      striped
      class="text-center rounded-lg shadow-lg"
    >
      <template v-slot:cell(category)="data" class="text-center">
        <div v-if="data.item.category.length">
          <b-badge
            v-for="(value, index) in data.item.category"
            :key="index"
            v-bind:style="{background: value.color, color: 'white'}"
          >
            <b-icon icon="tag-fill"></b-icon>
            {{value.name}}
          </b-badge>
        </div>
      </template>
      <template v-slot:cell(actions)="data" class="text-center">
        <b-button-group size="sm">
          <b-button variant="success" @click="editEvent(data.item)">
            <b-icon-pencil></b-icon-pencil>
          </b-button>
          <b-button variant="danger" @click="delEvent(data.item.name, data.item.id)">
            <b-icon-x-square></b-icon-x-square>
          </b-button>
          <button class="btn btn-sm btn-info" type="button" @click="showEvent(data.item)">
            <b-icon-eye></b-icon-eye>
          </button>
        </b-button-group>
      </template>
    </b-table>
    <b-modal v-model="showModal" size="lg" hide-footer>
      <template v-slot:modal-title>Evento</template>
      <div class="d-block">
        <b-card :img-src="modal.img" img-alt="Image" img-top tag="article" style="max-width: 100%;">
          <div class="text-right" style="margin-top:-15px">
            <b-badge v-bind:style="{background: category.color, color: 'white'}">
              <b-icon icon="tag-fill"></b-icon>
              {{category.name}}
            </b-badge>
          </div>
          <b-card-title>{{modal.name}}</b-card-title>

          <b-card-text>{{modal.description}}</b-card-text>
          <div class="mt-5 text-center">
            <h6>
              {{modal.local}}
              <b-icon-geo-alt></b-icon-geo-alt>
              <br />
              <small>{{modal.adress}}</small>
            </h6>
          </div>
        </b-card>
      </div>
    </b-modal>
    <Modal :data="data" />
    <b-icon-plus font-scale="3" @click="addEvent" class="float rounded-circle bg-primary p-1" variant="light"></b-icon-plus>
  </div>
</template>

<script>
import moment from "moment";
import barramento from "@/eventBus/barramento";
import TitleC from "../Title";
import Modal from "./Modal";
export default {
  components: {
    TitleC,
    Modal
  },
  data() {
    return {
      data: [],
      title: 'Eventos',
      subTitle: 'Ambiente de administração dos eventos!',
      fields: [
        {
          key: "name",
          label: "Nome"
        },
        {
          key: "description",
          label: "Descrição",
          formatter: value => {
            return value.slice(0, 50) + "...";
          }
        },
        {
          key: "adress",
          label: "Endereço"
        },
        {
          key: "date",
          label: "Data",
          formatter: value => {
            return moment(value).format("DD/MM/YYYY");
          }
        },
        {
          key: "category",
          label: "Categoria"
        },
        {
          key: "actions",
          label: "Ações"
        }
      ],
      modal: [],
      category: {
        name: "",
        color: ""
      },
      filter: null,
      filterOn: [],
      showModal: false,
      alertTitle: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  created() {
    let data = [
      {
        id: 1,
        name: "Ação Social",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        img: "/img/Praça%20Fabio%20Paracat.jpg",
        local: "Praça Fábio Paracat",
        adress: "Av. Cap. Ene Garcês - São Francisco",
        date: "2020-05-15",
        startTime: "19:00",
        endTime: "23:00",
        category: [
          {
            id: 2,
            name: "Social",
            description: "Descrição",
            color: "#febd11"
          }
          // {
          //   id: 2,
          //   name: "Nome",
          //   description: "Descrição",
          //   color: "#009f57"
          // }
        ]
      }
    ];
    this.data = data;
    barramento.$on("alertEvent", message => {
      this.alertTitle = message;
      this.dismissCountDown = this.dismissSecs;
    });
    barramento.$on("createTable", data => {
      this.data = data;
      this.alertTitle =
        "Evento criado com sucesso! Esse aviso será encerrado em ";
      this.dismissCountDown = this.dismissSecs;
    });
    barramento.$on("upTableEvent", data => {
      this.data = data;
      this.alertTitle =
        "Evento editado com sucesso! Esse aviso será encerrado em ";
      this.dismissCountDown = this.dismissSecs;
    });
  },
  methods: {
    addEvent() {
      barramento.$emit("mEvent", false);
    },
    editEvent(event) {
      barramento.$emit("mEvent", event);
    },
    delEvent(name, id) {
      this.$bvModal
        .msgBoxConfirm("Deseja excluir o evento " + name.toUpperCase() + " ?", {
          title: "Confirmação",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "SIM",
          cancelTitle: "NÃO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          this.delete(value, id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    delete(value, id) {
      if (value) {
        let ar = [];
        this.data.map(function(item) {
          ar.push(item.id);
        });
        let result = ar.indexOf(id);
        this.data.splice(result, 1);
        // this.$http
        //   .delete(`category/${id}`)
        //   .then(res => {
        //     console.log(res);
        this.alertTitle =
          "Evento excluído com Secesso! Esse aviso será encerrado em ";
        this.dismissCountDown = this.dismissSecs;
        // })
        // .catch(function(error) {
        //   console.log(error);
        // });
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    showEvent(data) {
      this.modal = data;
      this.category.name = data.category[0].name;
      this.category.color = data.category[0].color;
      console.log(data);
      this.showModal = !this.showModal;
    }
  }
};
</script>
