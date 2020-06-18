<template>
  <b-table
    id="tableUsers"
    :items="items"
    :fields="fields"
    hover
    striped
    responsive
    borderless
    class="text-center rounded-lg shadow-lg"
  >
    <template v-slot:cell(permission)="data">{{data.value.name}}</template>
    <template v-slot:cell(actions)="data">
      <b-button-group size="sm">
        <b-button variant="success" @click="editUsers(data.item)">
          <b-icon-pencil></b-icon-pencil>
        </b-button>
        <b-button variant="danger" @click="delUser(data.item.name, data.item.id)">
          <b-icon-x-square></b-icon-x-square>
        </b-button>
      </b-button-group>
    </template>
  </b-table>
</template>

<script>
import barramento from "@/eventBus/barramento";
export default {
  data() {
    return {
      fields: [
        { key: "name", label: "Nome" },
        { key: "email", label: "Email" },
        { key: "sector", label: "Departamento" },
        { key: "permission", label: "Acesso" },
        { key: "actions", label: "Ações" }
      ],
      items: [
        {
          id: 1,
          name: "Usuário 01",
          email: "usuario01@email.com",
          sector: "setor 01",
          permission: { id: 1, name: "Administrador" }
        },
        {
          id: 2,
          name: "Usuário 02",
          email: "usuario02@email.com",
          sector: "setor 02",
          permission: { id: 2, name: "Eventos" }
        },
        {
          id: 3,
          name: "Usuário 03",
          email: "usuario03@email.com",
          sector: "setor 03",
          permission: { id: 3, name: "Rotas, Horários e Paradas" }
        }
      ]
    };
  },
  methods: {
    editUsers(data) {
      barramento.$emit("editUserData", data);      
    },
    delUser(user, id) {
      this.$bvModal
        .msgBoxConfirm("Deseja excluir o usuário " + user + " ?", {
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
          this.confirmUser(value, id, user);
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirmUser(value, id, user) {
      if (value) {
        let ar = [];
        this.items.map(function(item) {
          ar.push(item.id);
        });
        let result = ar.indexOf(id);
        this.items.splice(result, 1);
        // this.$http
        //   .delete(`category/${id}`)
        //   .then(res => {
        //     console.log(res);
        barramento.$emit(
          "alertEvent",
          "Usuário " + user + " removido com sucesso!"
        );
        // })
        // .catch(function(error) {
        //   console.log(error);
        // });
      }
    }
  }
};
</script>

<style>
</style>