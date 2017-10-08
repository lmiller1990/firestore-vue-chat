<template>
  <div id="app">
		<InitializeData />
		<ConversationContainer 
			v-for="id in convoIds"
			:conversation="conversations[id]"
	 		:id="id"
	 		:key="id"
		/>
  </div>
</template>

<script>
import InitializeData from './components/InitializeData.vue'
import ConversationContainer from './components/ConversationContainer.vue'

import { mapState } from 'vuex'

export default {
  name: 'app',
	components: {
		InitializeData,
		ConversationContainer
	},

	computed: {
		...mapState({
			conversations: state => state.conversations.all,
			convoIds: state => state.conversations.allIds
		})
	},
}
</script>

<style>
</style>
