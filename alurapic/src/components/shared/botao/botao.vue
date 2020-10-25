<template>
	<button @click="disparaAcao()" class="btn" :class="btnEstilo" :type="tipo" >{{rotulo}}</button>
</template>

<script>
	export default {

		props: {
			tipo: {
				type: String, 
				required: true
			},

			rotulo: {
				type: String, 
				required: true
			},

			confirmacao: Boolean,
			estilo: String
		}, // ['tipo', 'rotulo', 'confirmacao', 'textoConfirmacao', 'estilo'],

		methods: {
			disparaAcao() {
				if (this.confirmacao) {
					if (confirm((this.textoConfirmacao) ? this.textoConfirmacao : "Confirmar operação?")) {
						this.$emit('botaoAtivado');
					}
				} else {
					this.$emit('botaoAtivado');
				}
			}
		},

		computed: {
			btnEstilo() {
				if(!this.estilo || this.estilo == 'padrao') return 'btn btn-default';
				if(this.estilo == 'perigo') return 'btn btn-danger';
			}
		}
	}
</script>

<style>
	.btn {
		display: inline-block;
		padding: 10px;
		border-radius: 3px;
		margin: 10px;
		font-size: 1.2em;
	}

	.btn-default {
		background: lightblue;
		color: white;
	}

	.btn-danger {
		background: firebrick;
		color: white;
	}
</style>