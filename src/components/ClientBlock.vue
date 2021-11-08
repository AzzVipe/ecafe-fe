<template>
	<div class="client">
		<div class="client-wrapper">
			<div class="client-image">
				<img src="../assets/computer.jpg">
			</div>
			<div class="client-details">
				<div class="client-title-wrapper">
					<router-link :to='"/pc/" + client.id'>
						<h1 class="client-title">{{ client.username }}</h1>
					</router-link>
					<p class="client-heading-2">{{ client.hostname }}</p>
				</div>
				<p class="client-heading-2">
					<i class="ri-links-line"></i> 
					{{ client.ip }}
				</p>
				<p
					class="client-heading-2"
					:class="[client.status === 'online' ? 'is-active' : 'is-inactive']">
					<i class="ri-checkbox-blank-circle-fill" style="font-size: 8px"></i> {{ client.status }}
				</p>
			</div>
			<div class="client-actions">
				<div class="capsule">
					<button class="button is-sm">
						<i class="ri-lock-fill"></i>
					</button>
					<!-- <button class="button is-sm capsule-right">
						<span class="elipses">
							<span class="elipse"></span>
							<span class="elipse"></span>
							<span class="elipse"></span>
						</span>
					</button> -->
				</div>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	name: "ClientBlock",
	props: ["client"],
}
</script>