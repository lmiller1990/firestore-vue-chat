const state = {
	all: {}
}

const mutations = {
	ADD_MESSAGE (state, { conversationId, messages }) {
		state.all[conversationId].messages = messages
	},
}

const actions = {

}

export default { namespaced: true, state, mutations, actions }

