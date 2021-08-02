import axios from 'axios'
import config from '../../config'
import router from '../.././router'

const user = JSON.parse(localStorage.getItem('user')) || null // eslint-disable-line no-unused-vars

const formatBasicAuth = (userName, password) => {
  const basicAuthCredential = userName + ":" + password;
  const bace64 =  btoa(basicAuthCredential);
  return 'Basic ' + bace64;
}

export default {
state: {
	status: user ? { loggedIn: true } : {},
	user: user || null,
	error: { show:false, msg:'' },
	load_checking: false,
},

/* eslint-disable */
mutations: {
	
	LOGIN_SUCCESS: (state, user) => {
		state.status = { loggedIn: true }
		state.user = user // eslint-disable-line no-unused-vars
	},

	LOGIN_FAIL: (state, msg) => {
		state.status = {}
    state.user = null
    state.error = {
			show: true,
			msg: msg
		}
	},

	LOGOUT: (state, user) => {
		state.status = {}
		state.user = null
	},

	SET_LOADING: (state, boolean) => {
		state.load_checking = boolean
	},
},


actions: {	
	LOG_IN: ({commit}, userInfo) => {
		commit('SET_LOADING', true)
		axios.
			post(`${config.URL_PANTHEON}/user/login?_format=json`, userInfo)
			.then((res) => {
				const currentUser = res.data
        const basic = formatBasicAuth(userInfo.name, userInfo.pass)
				localStorage.setItem('user', JSON.stringify(currentUser))
        localStorage.setItem('basic', basic)
				commit('LOGIN_SUCCESS', currentUser)
				router.push('/manage/content')
			})
			.catch((error) => {
        commit('LOGIN_FAIL', 'Username or password is wrong')
      })
			.finally(() => commit('SET_LOADING', false))

	},

	LOG_OUT:({commit, state}) => {
    commit('LOGOUT')
    localStorage.removeItem('user')
    localStorage.removeItem('basic')
    localStorage.removeItem('csrfToken')
    router.push('/')
	},
},

getters: {},

}