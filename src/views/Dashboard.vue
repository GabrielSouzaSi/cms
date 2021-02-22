<template>
  <div id="app">
    <div class="wrapper">
      <!-- Sidebar  -->
      <nav id="sidebar">
        <div class="sidebar-header">
          <img src="../assets/Brasao_Boa_Vista1.png" class="mx-auto d-block" width="200" height="145" />
          <!-- <img src="http://placehold.it/200x145?text=Logo" class="mx-auto d-block" /> -->
        </div>

        <ul class="list-unstyled components">
          <li>
            <router-link hidden to="/" active-class="menuActive" exact>
              <b-icon-columns-gap style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-columns-gap>Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/events" active-class="menuActive">
              <b-icon-calendar4-event style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-calendar4-event>Eventos
            </router-link>
          </li>
          <li>
            <router-link hidden to="/users" active-class="menuActive">
              <b-icon-person style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-person>Usuários
            </router-link>
          </li>
          <li>
            <router-link to="/category" active-class="menuActive">
              <b-icon-list-ul style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-list-ul>Categorias
            </router-link>
          </li>
          <li>
            <router-link to="/rotas" active-class="menuActive">
              <b-icon-map style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-map>Rotas e Paradas
            </router-link>
          </li>
          <li>
            <router-link hidden to="/suporte" active-class="menuActive">
              <b-icon-question-circle style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-question-circle>Suporte
            </router-link>
          </li>
        </ul>
      </nav>
      <b-container fluid class="p-0 m-0">
        <b-overlay :show="show" :opacity="1" rouned="sm">
          <!-- Page Content  -->
          <div id="content">
            <!-- navbar -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <button type="button" id="sidebarCollapse" class="btn btn-outline-primary btn-sm">
                <b-icon-list style="width: 20px; height: 20px;"></b-icon-list>
              </button>

              <div class="navbar-nav ml-auto">
                <a class="nav-link mr-2" href="#" hidden>
                  <b-icon-bell-fill style="width: 20px; height: 20px;"></b-icon-bell-fill>
                  <span class="badge badge-pill badge-danger">13</span>
                </a>
              </div>

              <div class="dropdrown">
                <a class="pr-3" data-toggle="dropdown" href="#">
                  <b-icon-person-circle style="width: 25px; height: 25px;"></b-icon-person-circle>
                </a>
                <div class="dropdown-menu dropdown-menu-right mr-3">
                  <div class="dropdown-item text-center">
                    <div>
                      <b-icon-person-fill style="width: 40px; height: 40px;"></b-icon-person-fill>
                    </div>
                    <div>Gabriel Souza</div>
                  </div>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Perfil</a>
                  <a class="dropdown-item" href="#">Ajuda</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" @click="logout" href="#">Sair</a>
                </div>
              </div>
            </nav>
            <!-- Data -->
            <router-view name="cms" />
            <!--  -->
          </div>
          <template v-slot:overlay>
            <div class="text-center">
              <b-spinner variant="primary" label="Text Centered"></b-spinner>
              <p id="cancel-label">Carregando...</p>
            </div>
          </template>
        </b-overlay>
      </b-container>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import barramento from "@/eventBus/barramento";
import login from "../auth/auth";
export default {
  name: "app",
  data() {
    return {
      show: false
    };
  },
  created() {
    barramento.$on("loadMain", data => {
      this.show = data;
    });
  },
  mounted() {
    $(document).ready(function() {
      $("#sidebarCollapse").on("click", function() {
        $("#sidebar").toggleClass("active");
        $('[data-toggle="tooltip"]').tooltip();
      });
    });
     document.title = "CMS";
  },
  methods: {
    logout() {
      login.logout() ? this.$router.push('/login') : alert("Algo deu erro!")
    }

  }
};
</script>