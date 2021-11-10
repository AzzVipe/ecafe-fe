<template>
	<main>
		<NavigationBar></NavigationBar>
		<div class="container">
			<div class="clients">
				<ClientHeader @on-shutdown="shutDown"></ClientHeader>
				<TaskBar 
					:n-clients="nClients" 
					:n-online="nOnline"
					:n-offline="nOffline"
				>
						
				</TaskBar>
				<div class="clients-body">

					<ClientBlock v-for="(client, index) in clients" :client="client" :key="index"></ClientBlock>

				</div>

				<div class="clients-footer"></div>
				<div v-if="showToast && msg" :class="{'is-success': toastStatus, 'is-danger': !toastStatus}" class="toast">
					<p>{{ msg }}</p>
				</div>
			</div>
		</div>
	</main>
</template>

<script>

import NavigationBar from '../components/NavigationBar.vue';
import ClientHeader from '../components/ClientHeader.vue';
import ClientBlock from '../components/ClientBlock.vue';
import TaskBar from '../components/TaskBar.vue';
import axios from 'axios';
import { actions, performAction } from '../actions.js';

export default {
	name: "Home",
	components: {
		NavigationBar,
		ClientHeader,
		ClientBlock,
		TaskBar,
	},

	data() {
		return {
			nClients: 0,
			nOnline: 0,
			nOffline: 0,
			clients: [],
			actions: actions,

			showToast: false,
			toastStatus: false,
			msg: "",
		};
	},

	methods: {
		fetchClients() {
			const url = "http://localhost:8080/client/index";
			axios.get(url)
			.then((response) => {
				console.log(response);
				this.clients = response.data.clients;
				this.nClients = this.clients.length;
				this.nOnline = this.clients.filter(obj => obj.status === 'online').length ;
				this.nOffline = this.nClients - this.nOnline;
				// console.log(this.nOffline);
			});
		},

		shutDown() {
			this.actions.forEach((action) => {
				if (action.cmd === 'poweroff') {
					this.clients.forEach((client) => {
						const param = new URLSearchParams();
						param.append('id', client.id);
						this.doAction(action, param);
					})
				}
			})
		},

		doAction(action, param) {

			performAction(action, param).then((response) => {
				this.toastStatus = true;
				this.msg = response.data.message;
		
			}).catch((error) => {
				this.toastStatus = false;
				this.msg = error.data.message;
			}).finally(() => {
				this.showToast = true;
				setTimeout(() => {
					this.showToast = false;
					this.msg = "";
				}, 4000);
			});
		},
	},

	mounted() {
		this.fetchClients();
	}
}
</script>