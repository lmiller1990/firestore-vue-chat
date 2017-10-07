<template>
  <div>
		<input v-model="messageText" @keyup.enter="send" placeholder="Enter a message" />
  </div>
</template>

<script>
  export default {
    name: 'MessageForm',

		data () {
			return {
				messageText: ''
			}
		},

		send () {
			this.$emit('send')
		}
  }
</script>

<style scoped>
</style>
