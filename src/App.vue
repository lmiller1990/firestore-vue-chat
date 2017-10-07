<template>
  <div id="app">
		<InitializeData />
		<ConversationContainer 
			v-for="id in convoIds"
			:conversation="conversations[id]"
	 		:id="id"
	 		:key="id"
		/>
		<!--<button @click="register">Register</button>
		<button @click="writeCities">Write</button>
		<button v-if="db" @click="get">Get</button>
		<button v-if="db" @click="updateSF">Update SF</button>
		<button v-if="db" @click="listen">Listen</button>-->
		{{ sanFran }}
  </div>
</template>

<script>
import InitializeData from './components/InitializeData.vue'
import ConversationContainer from './components/ConversationContainer.vue'
import firebase from 'firebase'
import 'firebase/firestore'
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

	data () {
		return { 
			sanFran: null
		}
	},

	created () {
		console.log('init', this.$store.state.db)
	},

	methods: {
		listen () {
			this.db.collection("cities").doc("SF")
				.onSnapshot(doc => {
					console.log('Current data:', doc && doc.data())
					this.sanFran = doc.data()
			})
		},

		updateSF () {
			let sf = this.db.collection('cities').doc('SF')

			return sf.update({
				population: Math.ceil(Math.random() * 100000)
			})
			.then(() => console.log("Updated"))
		},

		get () {
			let docRef = this.db.collection('cities').doc('SF')

			docRef.get().then(doc => {
				if (doc.exists) {
					console.log('Data:', doc.data())
					this.sanFran = doc.data()
				} else {
					console.log('No such document')
				}
			})
			.catch(err => console.log('Error', err))
		},
		
		register () {
			firebase.initializeApp(config)
			this.db = firebase.firestore();
		},

		writeCities () {

			var citiesRef = db.collection("cities");

			citiesRef.doc("SF").set({
				name: "San Francisco", state: "CA", country: "USA",
				capital: false, population: 860000 
			});
			citiesRef.doc("LA").set({
				name: "Los Angeles", state: "CA", country: "USA",
				capital: false, population: 3900000 
			});
			citiesRef.doc("DC").set({
				name: "Washington, D.C.", state: null, country: "USA",
				capital: true, population: 680000 
			});
			citiesRef.doc("TOK").set({
				name: "Tokyo", state: "null", country: "Japan",
				capital: true, population: 9000000 
			});
			citiesRef.doc("BJ").set({
				name: "Beijing", state: null, country: "China",
				capital: true, population: 21500000 
			});

		}
	}
}
	</script>

<style>
</style>
