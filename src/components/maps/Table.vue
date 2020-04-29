<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group label-align-sm="right" label-size="sm" label-for="filterInput">
          <b-input-group size="sm">
            <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Pesquisar"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''" variant="danger">Limpar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert
          :show="dismissCountDown"
          dismissible
          fade
          variant="success"
          @dismiss-count-down="countDownChanged"
        >{{alertTitle}} {{ dismissCountDown }} segundos</b-alert>
        <b-table
          id="my-table"
          :items="items"
          :fields="fields"
          :per-page="perPage"
          :filter="filter"
          head-variant="light"
          :filterIncludedFields="filterOn"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          no-border-collapse
          bordered
          hover
          responsive
          class="text-center"
        >
          <template v-slot:cell(actions)="data" class="text-center">
            <b-button-group size="sm">
              <b-button
                variant="success"
                @click="modal(data.item)"
                v-b-tooltip.hover
                title="Editar!"
              >
                <b-icon-pencil></b-icon-pencil>
              </b-button>
              <b-button
                variant="danger"
                @click="showMsgBoxTwo(data.item.number, data.item.id)"
                v-b-tooltip.hover
                title="Excluir!"
              >
                <b-icon-x-square></b-icon-x-square>
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-input-group prepend="Motrar" label-size="sm" size="sm" :append="append()">
          <b-form-select
            style="max-width: 60px;"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-input-group>
      </b-col>
      <b-col>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          first-number
          prev-text="Anterior"
          next-text="Próximo"
          last-number
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import barramento from "@/eventBus/barramento";
export default {
  props: {
    table: {
      type: Array
    }
  },
  data() {
    return {
      fields: [
        {
          key: "number",
          label: "Nº",
          sortable: true,
          variant: "info"
        },
        {
          key: "sense",
          label: "Sentido"
        },
        {
          key: "adress",
          label: "Endereço"
        },
        {
          key: "district",
          label: "Bairro"
        },
        {
          key: "lat",
          label: "Latitude"
        },
        {
          key: "lgt",
          label: "Longitude"
        },
        {
          key: "climatizado",
          label: "Climatizado",
          formatter: value => {
            return value ? "Sim" : "Não";
          }
        },
        {
          key: "actions",
          label: "Ações"
        }
      ],
      sortBy: 'number',
      currentPage: 1,
      totalRows: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50, 100],
      items: [],
      filter: null,
      filterOn: [],
      alertTitle: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  created() {
    this.items = this.table;
    this.totalRows = this.items.length;
    barramento.$on("alert", message => {
      this.alertTitle = message
      this.dismissCountDown = this.dismissSecs;
    });
  },
  methods: {
    modal(data) {
      console.log(data);

      barramento.$emit("point", data);
    },
    append() {
      return "Total: " + this.items.length;
    },
    showMsgBoxTwo(number, id) {
      this.$bvModal
        .msgBoxConfirm("Deseja excluir a parada Nº " + number + " ?", {
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
          this.delPoint(value, id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    delPoint(value, id) {
      if (value) {
        this.$http
          .delete(`points/${id}`)
          .then(res => {
            console.log(res)
            barramento.$emit("delPoint", 'Parada excluída com Secesso! Esse aviso será encerrado em ')
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    },
    upArray(value) {
      const index = this.items
        .map(function(item) {
          return item.id;
        })
        .indexOf(value);
      this.items.splice(index, 1);
      barramento.$emit("table", this.items);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  watch: {
    table(v1) {
      this.totalRows = v1.length;
      this.items = v1;
    }
  }
};
</script>