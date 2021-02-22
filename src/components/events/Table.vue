<template>
  <div>
    <b-form-group
      label-align-sm="right"
      label-size="sm"
      label-for="filterInput"
    >
      <b-input-group size="sm">
        <b-form-input
          v-model="filter"
          type="search"
          id="filterInput"
          placeholder="Pesquisar"
        ></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-table
      :items="table"
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
        <!-- <div v-if="data.item.category.length">
          <b-badge
            v-for="(value, index) in data.item.category"
            :key="index"
            v-bind:style="{ background: value.color, color: 'white' }"
          >
            <b-icon icon="tag-fill"></b-icon>
            {{ data.item.category.name }}
          </b-badge>
        </div> -->
        <b-badge
          v-bind:style="{
            background: data.item.category.color,
            color: 'white',
          }"
        >
          <b-icon icon="tag-fill"></b-icon>
          {{ data.item.category.name }}
        </b-badge>
      </template>
      <template v-slot:cell(actions)="data" class="text-center">
        <b-button-group size="sm">
          <b-button variant="success" @click="editEvent(data.item)">
            <b-icon-pencil></b-icon-pencil>
          </b-button>
          <b-button
            variant="danger"
            @click="delEvent(data.item.name, data.item.id)"
          >
            <b-icon-x-square></b-icon-x-square>
          </b-button>
          <button
            class="btn btn-sm btn-info"
            type="button"
            @click="showEvent(data.item)"
          >
            <b-icon-eye></b-icon-eye>
          </button>
        </b-button-group>
      </template>
    </b-table>
    <Viewer />
    <Modal :category="category" />
    <b-icon-plus
      font-scale="3"
      @click="addEvent"
      class="float rounded-circle bg-primary p-1"
      variant="light"
    ></b-icon-plus>
  </div>
</template>

<script>
import moment from "moment";
import barramento from "@/eventBus/barramento";
import Modal from "./Modal";
import Viewer from "./ViewerData";
export default {
  components: {
    Modal,
    Viewer,
  },
  props: {
    table: {
      type: Array,
    },
    category: {
      type: Array,
    },
  },
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Nome",
        },
        {
          key: "description",
          label: "Descrição",
          formatter: (value) => {
            return value.slice(0, 50) + "...";
          },
        },
        {
          key: "address",
          label: "Endereço",
        },
        {
          key: "date",
          label: "Data",
          formatter: (value) => {
            return moment(value).format("DD/MM/YYYY");
          },
        },
        {
          key: "category",
          label: "Categoria",
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
      filter: null,
      filterOn: [],
    };
  },
  methods: {
    addEvent() {
      barramento.$emit("modalFormEvent", false);
    },
    editEvent(event) {
      barramento.$emit("modalFormEvent", event);
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
          centered: true,
        })
        .then((value) => {
          this.delete(value, id, name);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delete(value, id, name) {
      barramento.$emit("loadMain", true);
      // if (value) {
      //   let ar = [];
      //   this.data.map(function (item) {
      //     ar.push(item.id);
      //   });
      //   let result = ar.indexOf(id);
      //   this.data.splice(result, 1);
      //    this.alertTitle =
      //     "Evento excluído com Secesso! Esse aviso será encerrado em ";
      //   this.dismissCountDown = this.dismissSecs;
      //   }
      if (value) {
        this.$http
          .delete(`events/${id}`)
          .then((res) => {
            console.log(res);
            barramento.$emit("loadMain", false);
            barramento.$emit(
              "alertEvent",
              "Evento " +
                name +
                " excluído com Secesso! Esse aviso será encerrado em "
            );
          })
          .catch(function (error) {
            barramento.$emit("loadMain", false);
            console.log(error);
          });
      } else {
        barramento.$emit("loadMain", false);
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    showEvent(data) {
      barramento.$emit("viewerDataEvent", data);
    },
  },
};
</script>
