<template>
  <div>
		<input v-model="messageText" placeholder="Enter a message" />
  </div>
</template>

<script>
  export default {
    name: 'MessageForm',

		data () {
			return {
				messageText: ''
			}
		}
  }
</script>

<style scoped>
</style>
