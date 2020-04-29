<template>
  <div id="app">
    <div class="wrapper">
      <!-- Sidebar  -->
      <nav id="sidebar">
        <div class="sidebar-header">
          <img src="../assets/image.svg" class="mx-auto d-block" width="200" height="145">
          <!-- <img src="http://placehold.it/200x145?text=Logo" class="mx-auto d-block" /> -->
        </div>

        <ul class="list-unstyled components">
          <li>
            <router-link to="/" active-class="menuActive" exact><b-icon-columns-gap style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-columns-gap>Dashboard</router-link>
          </li>
          <li>
            <router-link to="/perfil" active-class="menuActive"><b-icon-person style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-person>Perfil</router-link>
          </li>
          <li>
            <router-link to="/categorias" active-class="menuActive"><b-icon-list-ul style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-list-ul>Categorias</router-link>
          </li>
          <li>
             <router-link to="/rotas" active-class="menuActive"><b-icon-map style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-map>Rotas e Paradas</router-link>
          </li>
          <li>
            <router-link to="/estatisticas" active-class="menuActive"><b-icon-pie-chart style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-pie-chart>Estatísticas</router-link>
          </li>
          <li>
            <router-link to="/suporte" active-class="menuActive"><b-icon-question-circle style="width: 25px; height: 25px;" class="align-middle mr-3"></b-icon-question-circle>Suporte</router-link>
          </li>
        </ul>
      </nav>

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
              <b-icon-people-circle style="width: 25px; height: 25px;"></b-icon-people-circle>
            </a>
            <div class="dropdown-menu dropdown-menu-right mr-3">
              <div class="dropdown-item text-center">
                <div><b-icon-person-fill style="width: 40px; height: 40px;"></b-icon-person-fill></div>
                <div>Gabriel Souza</div>
              </div>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Perfil</a>
              <a class="dropdown-item" href="#">Ajuda</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Sair</a>
            </div>
          </div>
        </nav>

        <!-- Data -->
        <router-view />
          <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: 'app',
  mounted() {
    $(document).ready(function() {
      $("#sidebarCollapse").on("click", function() {
        $("#sidebar").toggleClass("active");
        $('[data-toggle="tooltip"]').tooltip();
      });
    });
  },
  methods: {
  }
}
</script>

<style>
</style>