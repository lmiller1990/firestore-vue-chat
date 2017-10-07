<template>
  <div>
		Conversation ID: {{ id }}
		<hr>
		<Message 
			v-for="message in conversation.messages" 
			:message="message" 
			:key="message.created" 
		/>
		<br />
		<input v-model="newMessageText" @keyup.enter="send" placeholder="Type something..." />
  </div>
</template>

<script>
	import Message from './Message.vue'
	import { mapState } from 'vuex'

  export default {
    name: 'ConversationContainer',

		data () {
			return {
				newMessageText: ''
			}
		},

		props: {
			conversation: {
				type: Object,
				required: true
			},
			id: {
				type: String,
				required: true
			}
		},

		created () {
			this.$store.state.db.collection('conversations').doc(this.id)
				.onSnapshot(convo => {
					let source = convo.metadata.hasPendingWrites ? 'Local' : 'Server'
					if (convo && convo.data()) {
						this.$store.commit('conversations/ADD_MESSAGE', {
							conversationId: this.id,
							messages: convo.data().messages
						})
					}
					this.$forceUpdate()
					console.log(source, 'data ', convo && convo.data())
				})
		},

		methods: {
			send () {
				this.$store.dispatch('conversations/sendMessage', { 
					text: this.newMessageText, 
					created: Date.now(),
					conversationId: this.id,
					sender: this.$store.state.users.currentUser
				})	
			}
		},

		components: {
			Message,
		}
  }
</script>

<style scoped>
</style>
