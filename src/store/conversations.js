import Vue from 'vue'

const state = {
	all: {},
	allIds: []
}

const mutations = {
	SET_CONVERSATION (state, { conversation }) {
		state.all[conversation.id] = conversation.data()

		state.allIds.push(conversation.id)

	},

	ADD_MESSAGE (state, { conversationId, messages }) {
		state.all[conversationId].messages =  messages
	},
}

const actions = {
	sendMessage ({ commit, rootState }, { text, created, sender, conversationId }) {
		const convoRef = rootState.db.collection('conversations').doc(conversationId)

		convoRef.update({
			messages: [...state.all[conversationId].messages, { created, sender, text }]
		})
		.then(res => console.log('Message sent.'))
		.catch(err => console.log('Error', err))
	},
	
	seed ({ rootState }) {
		let convoRef = rootState.db.collection('conversations')

		convoRef.add({
			created: Date.now(),
			users: ['mr_a', 'mr_b'],
			messages: [
				{ text: 'Hi there', sender: 'mr_a', created: Date.now() },
				{ text: 'Hi to you too!', sender: 'mr_b', created: Date.now() }
			]
		})

		convoRef.add({
			created: Date.now(),
			users: ['mr_a', 'mr_c'],
			messages: []
		})
	},

	async get ({ commit, rootState }) {
		let convoRef = rootState.db.collection('conversations')
		let convos = await convoRef.get()

		console.log(convos.forEach(c => console.log(c, c.data(), c.id)))
		convos.forEach(conversation => commit('SET_CONVERSATION', { conversation }))
	}
}

export default { namespaced: true, state, mutations, actions }
