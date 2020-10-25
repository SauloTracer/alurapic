<template>
  <div class="corpo">
    <alurapicmenu :routes="routes"></alurapicmenu>
    <transition name="pagina">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { routes } from './routes.js';
  import menu from './components/shared/menu/menu.vue';

  export default {
    data() {
      return {
        routes
      }
    },
    components: {
      alurapicmenu: menu
    }
  }
</script>

<style>
  

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .3s
  }
  .pagina-enter, .pagina-leave-active {
    opacity: 0
  }
</style>
