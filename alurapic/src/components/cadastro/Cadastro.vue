<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    
    <h2 v-if="foto._id" class="centralizado">Editando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>
    
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" v-model="foto.titulo">
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url">
        <img v-show="foto.url" :src="foto.url" :alt="foto.titulo" :legend="foto.titulo" />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{name: 'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import botao from '../shared/botao/botao.vue';
import Foto from '../../domain/foto/Foto';
import service from '../../domain/foto/FotoService';


export default {

  components: {
    'meu-botao': botao
  },
  data() {
  	return {
  		foto: new Foto(),
  		id: this.$route.params.id
  	}
  },

  methods: {
  	grava() {
  		// this.$http.post("v1/fotos", this.foto)
  		// .then(()=> this.foto = new Foto(), err => console.log(err));
  		
  		this.service.cadastra(this.foto)
  		.then(() => {
  			if (this.id) {
  				this.$router.push({name: 'filtro', params: { filter: this.foto.titulo }});
  			}
  			this.foto = new Foto();

  		}, err=> console.log(err));
  	}
  },

  created() {
  	this.service = new service(this.$resource);
  	if (this.id) {
  		this.service.busca(this.id)
  		.then(foto => this.foto = foto, err => console.log(err));
  	}
  }
}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  img {
  	max-width: 300px;
  	max-height: 200px;
  }

</style>