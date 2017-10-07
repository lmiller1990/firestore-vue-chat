<template>
  <div class="message-container">
		<div :class="getPosition">
			{{ message.text }}
		</div>
  </div>
</template>

<script>
  export default {
    name: 'Message',

		props: {
			message: {
				type: Object,
				required: true
			}
		},

		created () {
			console.log(this.message)
		},

		computed: {
			getPosition () {
				if (this.message.sender === this.$store.state.users.currentUser) {
					return 'my message'
				} else {
					return 'message'
				}
			}
		}
  }
</script>

<style scoped>
.my.message {
	text-align: right;
}

.message-container {
	border: 1px solid silver;
}
</style>
