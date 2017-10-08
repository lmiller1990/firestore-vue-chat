const state = {
	all: {},
	currentUser: 'mr_b'
}

const mutations = {
	SET_USER (state, { user }) {
		state.all = {...state.all, [user.id]: user.data() }
	}
}

const actions = {
	seed ({ rootState }) {
		let userRef = rootState.db.collection('users')

		userRef.doc('mr_a').set({
			firstName: 'Andy',
			lastName: 'Andyson'
		})

		userRef.doc('mr_b').set({
			firstName: 'Ben',
			lastName: 'Benson'
		})

		userRef.doc('mr_c').set({
			firstName: 'Cee',
			lastName: 'Ceeson'
		})
	},

	async get ({ commit, rootState }) {
		let userRef = rootState.db.collection('users')
		let users = await userRef.get()

		users.forEach(user => commit('SET_USER', { user }))
	}
}

export default {
	namespaced: true, 
	state, 
	mutations, 
	actions
}

