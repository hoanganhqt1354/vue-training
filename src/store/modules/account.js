// import axios from 'axios'
// import config from '../config'

const user = JSON.parse(localStorage.getItem('user'));

export default {
	state: {
		status: user ? { loggedIn: true } : {},
		user: user || null,
		error: { show:false, msg:'' }
	},

	mutations: {
		LOGIN_SUCCESS: (state, user) => {
			state.status = {loggedIn: true}
			state.user = user
		},

		LOGIN_FAIL: (state, user, msg) => {
			state.status = {}
      state.user = null
      state.error = {
				show: true,
				msg
			}
		},

		LOGOUT: (state, user) => {
			state.status = {}
			state.user = null
		},
	},

	actions: {},

	getters: {},

}