<template>
  <div>
    <h1>{{ titulo }}</h1>
    <h3 v-show="message">{{ message }}</h3>

    <input type="search" name="filtro" id="filtro" class="filtro" placeholder="Aplicar filtro (título)" v-model="filtro" />

    <ul>
      <li v-for="foto in fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
            <img :src="foto.url" :alt="foto.titulo" v-meu-transform:scale>
            <router-link :to="{name: 'altera', params: { id: foto._id}}">
              <meu-botao tipo="button" rotulo="EDITAR" estilo="padrao" />
            </router-link>
            <meu-botao
              tipo="button" 
              rotulo = "EXCLUIR" 
              @botaoAtivado="remove(foto)" 
              :confirmacao="true" 
              textoConfirmacao="Deseja excluir essa foto?"
              estilo="perigo" />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
  import Painel from '../shared/painel/Painel.vue';
  import botao from '../shared/botao/botao.vue';
  import transform from '../../directives/Transform';
  import service from '../../domain/foto/FotoService';

  export default {

    components: {
      'meu-painel': Painel,
      'meu-botao': botao
    },

    directives: {
      'meu-transform': transform
    },

    methods: {
      remove(foto) {

        // this.$http.delete(`v1/fotos/${foto._id}`)
        // .then(() => {
        //   this.message = 'Foto removida com sucesso';
        //   let index = this.fotos.indexOf(foto);
        //   this.fotos.splice(index, 1);
        // }, err => {
        //   this.message = 'Não foi possível remover a foto.';
        //   console.log(err);
        // });

        // this.resource.delete({id: foto._id})
        // .then(() => {
        //   this.message = 'Foto removida com sucesso';
        //   let index = this.fotos.indexOf(foto);
        //   this.fotos.splice(index, 1);
        // }, err => {
        //   this.message = 'Não foi possível remover a foto.';
        //   console.log(err);
        // });

        this.service.apaga(foto._id)
        .then(() => {
          this.message = 'Foto removida com sucesso';
          let index = this.fotos.indexOf(foto);
          this.fotos.splice(index, 1);
        }, err => {
          this.message = 'Não foi possível remover a foto.';
          console.log(err);
        });

      }
    },

    data() {
      return {
        titulo: 'Alurapic',
        message: '',
        fotos: [],
        filtro: ''
      }
    },

    computed: {
      fotosComFiltro() {
        if (this.filtro) {
          let exp = new RegExp(this.filtro.trim(), 'i');
          let result = this.fotos.filter((foto) => exp.test(foto.titulo));

          // this.message = (result.length < 1) ? 'Nenhuma foto atende ao filtro especificado.' : '';

          return result;
        } else {
          return this.fotos;
        }
      }      
    },

    created() {
      // let promise = this.$http.get('v1/fotos')
      // .then(res => res.json())
      // .then(fotos => this.fotos = fotos, err=> console.log(err));

      // this.resource = this.$resource('v1/fotos{/id}');
      // this.resource.query()
      // .then(res => res.json())
      // .then(fotos => this.fotos = fotos, err=> console.log(err));

      this.service = new service(this.$resource);
      this.service.lista()
      .then(fotos => this.fotos = fotos, err=> console.log(err));

      this.filtro = this.$route.params.filter || '';
    }
  }
  </script>

  <style>
    .corpo h1 {
      text-align: center;
      width: 10%;
      margin: 0 auto;
    }

    .corpo img {
      width: 100%;      
    }

    .corpo img:hover {
      transition: all 1s;
      transform: scale(1.2);
    }

    .corpo li {
      display: inline-block;
      margin: 5px;
    }

    .corpo .filtro {
      display: block;
      width: 100%;
      margin: 10px 0;
      padding: 10px;
      box-sizing: border-box;
    }
  </style>
