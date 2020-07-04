<template>
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
                v-model="user.username"
                type="email"
                required
                placeholder="Email"
              ></b-form-input>

              <b-form-input
                class="mt-4"
                id="input-2"
                v-model="user.password"
                type="password"
                required
                placeholder="Senha"
              ></b-form-input>

              <b-form-group id="input-group-4" class="text-left mt-2">
                <b-form-checkbox-group v-model="checked" id="checkboxes-4">
                  <b-form-checkbox value="me">Lembrar-me</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>

              <b-button block type="submit" variant="primary" @click="onSubmit">Login</b-button>
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
            <li v-for="erro in erros" :key="erro">{{erro}}</li>
          </ul>
        </h3>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
// import login from "../auth/auth";
// import axios from "axios";
export default {
  data() {
    return {
      user: {
        grant_type: "password",
        client_id: 4,
        client_secret: "sKrQEaNwbvQonv0g15ROvgRiGUYDpgJhoEBN51i8",
        username: "gos.gabriel@gmail.com",
        password: "qwert1234"
      },
      storegeUser: {
        name: "",
        email: "",
        token: "",
        authorizedUser: false
      },
      checked: null,
      erros: []
    };
  },
  mounted() {
    document.title = "Login";
    const data = JSON.parse(localStorage.getItem("storageUserBv"));
    if (data) {
      data.authorizedUser && data.token
        ? this.$router.push("/")
        : localStorage.removeItem("storegeUserBv");
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.erros = [];
      if (this.user.username == "") this.erros.push("Email não informado.");
      if (this.user.password == "") this.erros.push("Senha não informado.");
      if (this.user.username && this.user.password) {
        this.loginUser();
      } else {
        this.$bvModal.show("modalLogin");
      }
    },
    auth() {
      this.$router.push({ path: "/" });
    },
    async loginUser() {
      var myHeaders = {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json"
      };

      const raw = JSON.stringify({
        grant_type: "password",
        client_id: 4,
        client_secret: "sKrQEaNwbvQonv0g15ROvgRiGUYDpgJhoEBN51i8",
        username: "gos.gabriel@gmail.com",
        password: "qwert1234"
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        mode: "no-cors",
        body: raw
      };

      // axios
      //   .post("http://104.248.225.49/oauth/token", requestOptions)
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });

      try {
        const res = await this.$http.post("/oauth/token", requestOptions)
        if(res.ok) console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>