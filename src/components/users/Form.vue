<template>
  <div>
    <b-card-group deck v-if="show">
      <b-card header="Cadastrar/Editar informações de usuário">
        <b-form @reset="onReset">
          <b-row>
            <b-col>
              <b-form-group label="Nome:" label-for="name">
                <b-form-input id="name" v-model="form.name" required placeholder="Seu nome"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Email" label-for="email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Seu email"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Departamento:" label-for="sector">
                <b-form-input
                  id="sector"
                  v-model="form.sector"
                  required
                  placeholder="Informe seu departamento"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Acesso:" label-for="access">
                <b-form-select id="access" v-model="form.permission" :options="permission" required></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6" offset-md="6">
              <b-row>
                <b-col>
                  <b-button v-if="addEdit" @click="onSubmit" block variant="primary" class="text-rigt">Cadastrar</b-button>
                  <b-button v-else @click="editData" block variant="success" class="text-rigt">Editar</b-button>
                </b-col>
                <b-col>
                  <b-button type="reset" block variant="danger">Limpar</b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object
    }
  },
  data() {
    return {
      addEdit: true, 
      form: {
        name: "",
        email: "",
        sector: "",
        permission: null
      },
      permission: [
        { text: "Selecione um acesso", value: null },
        { text: "Administrador", value: 1 },
        { text: "Eventos", value: 2 },
        { text: "Rotas, Horários e Paradas", value: 3 }
      ],
      show: true
    };
  },
  methods: {
    onSubmit() {
      alert(JSON.stringify(this.form));
    },
    editData() {
      alert(JSON.stringify(this.form));
    },
    onReset() {
      // Reset our form values
      this.addEdit = true
      this.form.name = "";
      this.form.email = "";
      this.form.sector = "";
      this.form.permission = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    setForm(data) {
      this.addEdit = false
      this.form.name = data.name 
      this.form.email = data.email 
      this.form.sector = data.sector 
      this.form.permission = data.permission.id
    }
  },
   watch: {
    userData(v1) {
      Object.entries(v1).length != 0 ? this.setForm(v1) : this.onReset();
    }
  }
};
</script>

<style>
</style>