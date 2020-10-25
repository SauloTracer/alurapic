import Cadastro from './components/cadastro/Cadastro.vue'
import Home from './components/home/Home.vue'

export const routes = [
	{path: '', name: 'home', component: Home, title: 'Home'},
	{path: '/cadastro',  name: 'cadastro', component: Cadastro, title: 'Cadastro'},
	{path: '/cadastro/:id',  name: 'altera', component: Cadastro, title: 'Cadastro', hidden: true},
	{path: '/:filter', component: Home, hidden: true, name: 'filtro'},
	{path: '*', component: Home, hidden: true}
];
