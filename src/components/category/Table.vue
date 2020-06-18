<template>
  <div>
    <b-alert
          :show="dismissCountDown"
          dismissible
          fade
          variant="success"
          @dismiss-count-down="countDownChanged"
        >{{alertTitle}} {{ dismissCountDown }} segundos</b-alert>
        <b-table
          :items="data"
          :fields="fields"
          :sort-by.sync="sortBy"
          responsive
          hover
          borderless
          striped
          class="text-center rounded-lg shadow-lg"
        >
          <template v-slot:cell(color)="data" class="text-center">
            {{data.item.color}}
            <b-icon
              icon="square"
              font-scale="1.5"
              v-bind:style="{background :data.item.color, color:data.color}"
            ></b-icon>
          </template>
          <template v-slot:cell(actions)="data" class="text-center">
            <b-button-group size="sm">
              <b-button variant="success" @click="editCategory(data.item)">
                <b-icon-pencil></b-icon-pencil>
              </b-button>
              <b-button variant="danger" @click="delCategory(data.item.name, data.item.id)">
                <b-icon-x-square></b-icon-x-square>
              </b-button>
            </b-button-group>
          </template>
        </b-table>
    <Modal :data="data" />
    <b-icon-plus font-scale="3" @click="addCategory" class="float rounded-circle bg-primary p-1" variant="light"></b-icon-plus>
  </div>
</template>

<script>
import barramento from "@/eventBus/barramento";
import Modal from "./Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      data: [],
      fields: [
        {
          key: "name",
          label: "Nome",
          sortable: true
        },
        {
          key: "description",
          label: "Descrição"
        },
        {
          key: "color",
          label: "Cor"
        },
        {
          key: "actions",
          label: "Ações"
        }
      ],
      sortBy: "name",
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
        name: "Infraestrutura",
        description: "Lorem Ipsum is simply dummy text ",
        color: "#009f57"
      },
      {
        id: 2,
        name: "Cultura",
        description: "Lorem Ipsum is simply dummy text ",
        color: "#00a3c0"
      },
      {
        id: 3,
        name: "Cidadania",
        description: "Lorem Ipsum is simply dummy text ",
        color: "#febd11"
      },
      {
        id: 4,
        name: "Esportes",
        description: "Lorem Ipsum is simply dummy text ",
        color: "#00a3bf"
      }
    ];
    this.data = data;
    barramento.$on("alertCategory", message => {
      this.alertTitle = message;
      this.dismissCountDown = this.dismissSecs;
    });
    barramento.$on("createTable", data => {
      this.data = data;
      this.alertTitle =
        "Categoria adicionado com sucesso! Esse aviso será encerrado em ";
      this.dismissCountDown = this.dismissSecs;
    });
    barramento.$on("upTable", data => {
      this.data = data;
      this.alertTitle =
        "Categoria editado com sucesso! Esse aviso será encerrado em ";
      this.dismissCountDown = this.dismissSecs;
    });
  },
  methods: {
    addCategory() {
      barramento.$emit("mCategory", false);
    },
    editCategory(category) {
      barramento.$emit("mCategory", category);
    },
    delCategory(name, id) {
      this.$bvModal
        .msgBoxConfirm(
          "Deseja excluir a categoria " + name.toUpperCase() + " ?",
          {
            title: "Confirmação",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "SIM",
            cancelTitle: "NÃO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )
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
          "Categoria excluída com Secesso! Esse aviso será encerrado em ";
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
    }
  }
};
</script>

<style>
</style>