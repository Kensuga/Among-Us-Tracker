import Vue from 'vue';
import App from './App.vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faPlus,
	faMinus,
	faEdit,
	faTrash,
	faSave,
	faCheck,
	faSyncAlt,
	faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

library.add(
	faPlus,
	faMinus,
	faEdit,
	faTrash,
	faSave,
	faCheck,
	faSyncAlt,
	faMinusCircle
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
	render: (h) => h(App),
}).$mount('#app');
