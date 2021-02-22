<template>
  <b-overlay :show="show" :opacity="1" rouned="sm">
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" md="5">
          <b-card class="text-center">
            <template v-slot:header>
              <b-icon
                icon="person-fill"
                variant="light"
                font-scale="5"
                class="rounded-circle bg-primary p-2"
              ></b-icon>
            </template>
            <b-card-text>
              <b-form>
                <b-form-input
                  id="input-1"
                  type="email"
                  v-model="user.email"
                  required
                  placeholder="Email"
                ></b-form-input>

                <b-form-input
                  class="mt-4"
                  id="input-2"
                  type="password"
                  v-model="user.password"
                  required
                  placeholder="Senha"
                ></b-form-input>

                <!-- <b-form-group id="input-group-4" class="text-left mt-3">
                <b-form-checkbox-group v-model="user.checked" id="checkboxes-4">
                  <b-form-checkbox>Lembrar-me</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group> -->

                <b-button
                  block
                  class="mt-4"
                  type="submit"
                  variant="primary"
                  @click="onSubmit"
                  >Login</b-button
                >
              </b-form>
            </b-card-text>
            <template v-slot:footer>
              <a href="#" class>Recuperar senha?</a>
            </template>
          </b-card>
        </b-col>
      </b-row>
      <b-modal id="modalLogin" hide-footer>
        <template v-slot:modal-title>Atenção</template>
        <div>
          <h3>
            <ul>
              <li v-for="erro in erros" :key="erro">{{ erro }}</li>
            </ul>
          </h3>
        </div>
      </b-modal>
    </b-container>
    <template v-slot:overlay>
      <div class="text-center mt-5">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
        <p id="cancel-label">Carregando...</p>
      </div>
    </template>
  </b-overlay>
</template>

<script>
import login from "../auth/auth";
// import axios from "axios";
export default {
  data() {
    return {
      show: false,
      user: {
        email: "",
        password: "",
        token: "",
        authorizedUser: false,
      },
      erros: [],
    };
  },
  mounted() {
    // console.log(process.env.VUE_APP_ROOT_API)
    document.title = "Login";
    const data = JSON.parse(localStorage.getItem("storageUserBv"));
    // if (data){
    //   const user = JSON.parse(localStorage.getItem("dataUser"))
    //   console.log(user);
    // }
    if (data) {
      data.authorizedUser && data.token
        ? this.$router.push("/events")
        : localStorage.removeItem("storegeUserBv");
    }
  },
  methods: {
    onSubmit(evt) {
      this.show = true;
      evt.preventDefault();
      this.erros = [];
      if (this.user.email == "") this.erros.push("E-mail não informado.");
      if (this.user.password == "") this.erros.push("Senha não informado.");
      if (this.user.email && this.user.password) {
        this.loginUser();
      } else {
        this.show = false;
        this.$bvModal.show("modalLogin");
      }
    },
    auth(data) {
      login.saveUser(data);
      this.$router.push({ path: "/" });
    },
    async loginUser() {
      console.log('url='+process.env.VUE_APP_URL);
      try {
        const res = await this.$oauth.post("/oauth/token", {
          grant_type: "password",
          client_id: process.env.VUE_APP_CLIENT_ID,
          client_secret: process.env.VUE_APP_TOKEN_API,
          username: this.user.email,
          password: this.user.password,
        });
        var data = res;
        this.user.token = data.data.access_token;
        this.user.authorizedUser = true;
        this.show = false;
        this.auth(this.user);
      } catch (error) {
        this.show = false;
        alert("E-mail ou Senha incorreto!");
        console.log(error.response);
      }
    },
  },
};
</script>

<style>
</style>