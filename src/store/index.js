import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore'

import users from './users'
import conversations from './conversations'
import messages from './messages'

import config from '../config'

firebase.initializeApp(config)

Vue.use(Vuex)

const state = {
	db: firebase.firestore()
}

export default new Vuex.Store({
	state,
	modules: {
		users,
		conversations,
		messages
	}
})
