import axios from 'axios';

const actions = [
	{
		name: "Lock",
		cmd: "lock",
		onRequest: null,
		onResponse: () => {
			// instance.$emit('refetchClient');
		},
		canSendRequest: true,
	},
	{
		name: "Unlock",
		cmd: "unlock",
		onRequest: null,
		onResponse: () => {
			// instance.$emit('refetchClient');
		},
		canSendRequest: true,
	},
	{
		name: "Ping",
		cmd: "ping",
		canSendRequest: true,
	},
	{
		name: "Poweroff",
		cmd: "poweroff",
		canSendRequest: true,
	},
	{
		name: "Message",
		cmd: "message",
		canSendRequest: false,
		onRequest: (action, data) => {
			let msg = prompt("Write your message");
			data.append("msg", msg);
			return sendRequest(action, data);
		},
	},
	{
		name: "Screenshot",
		cmd: "screenshot",
		// onRequest: (instance) => {
		// 	instance.isImageLoading = true;
		// },
		// onResponse: (instance) => {
		// 	instance.isImageLoading = false;
		// },
		canSendRequest: true,
	},
];

function sendRequest(action, data) {
	let url = `/client/${action.cmd}`;
	url = `${url}?${data.toString()}`;

	return new Promise((resolve, reject) => {
		axios.get(url).then((response) => {

			if (action.onResponse) {
				// action.onResponse(response.data);
				action.onResponse(action);
			}
			resolve(response);
			// this.toastStatus = true;
			// if (response.data.message) {
			// 	this.msg = response.data.message;
			// }
		}).catch((error) => {
			console.error(error);
			reject(error);
			// this.toastStatus = false;
			// @TODO
			// this.msg = error.data.message;
		}).finally(() => {
			// this.action = "0";
			// this.isPerformingAction = false;
			// this.showToast = true;
			// setTimeout(() => {
			// 	this.showToast = false;
			// 	this.msg = "";
			// }, 4000);
		});
	})

}

function performAction(action, data) {

	if (action.onRequest && action.canSendRequest === false) {
		return action.onRequest(action, data);
	} else if (action.onRequest) {
		action.onRequest(action, data);
	}
	if (action.canSendRequest) {
		return sendRequest(action, data);
	}
}

export { actions, sendRequest, performAction };