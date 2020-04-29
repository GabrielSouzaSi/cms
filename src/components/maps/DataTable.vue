<template>
  <div class="row">
    <div class="table-responsive">
      <table id="table_id" class="table table-bordered table-hover text-center">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Sentido</th>
            <th>Latidude</th>
            <th>Longetude</th>
            <th>Climatizado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in datatable" :key="index">
            <td>{{value.number}}</td>
            <td>{{value.sense}}</td>
            <td>{{value.lat}}</td>
            <td>{{value.lgt}}</td>
            <td>{{climatizado(value.climatizado)}}</td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Visualizar!"
                >
                  <b-icon-eye style="width: 25px; height: 25px;"></b-icon-eye>
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Editar!"
                  @click="modal(datatable[index])"
                >
                  <b-icon-pencil style="width: 25px; height: 25px;"></b-icon-pencil>
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Excluir!"
                >
                  <b-icon-x-square style="width: 25px; height: 25px;"></b-icon-x-square>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import barramento from "@/eventBus/barramento";
export default {
  props: {
    datatable: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      data: null
    };
  },
  created() {
    // this.data = this.datatable
    this.table()
  },
  methods: {
    table() {
      $(document).ready(function() {
      $("#table_id").DataTable({
        destroy: true,
        dom: "<'row'<'col'fl>>" + "<'row'<'col'tr>>" + "<'row'<'col'i><'col'p>>",
        columnDefs: [
          { orderable: false, targets: [1, 2, 3, 4, 5] },
          { searchable: true, targets: 0 }
        ],
        lengthMenu: [
          [5, 10, 25, 50, -1],
          [5, 10, 25, 50, "All"]
        ],
        lengthChange: false,
        language: {
          url: "ptbr.lang.json"
        }
      });
      });
    },
    climatizado(value) {
      return value == false ? "Não" : "Sim";
    },
    modal(data) {
      barramento.$emit("point", data);
    }
  },
  watch: {
    datatable(v1) {
      // this.data = v1
      this.table()
      console.log(v1)
    }
  }
};
</script>
<style>
.dataTables_wrapper .dataTables_filter {
  text-align: left !important;
  padding-top: 10px;
}
</style>