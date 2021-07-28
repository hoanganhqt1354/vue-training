import axios from 'axios'
/* eslint-disable */
export default {
	state: {
		movies: [],
    loading: false,
    query: '',
    error: {
      show: false,
      msg: ''
    }
	},

	mutations: {
		SET_MOVIES: (state, movies) => {
			state.movies = movies
		},

		SET_LOADING: (state, boolean) => {
			state.loading = boolean
		},

		SET_MSG_ERROR: (state, msg) => {
			state.error = {
				show: true,
				msg
			}
		},

		SET_QUERY: (state, query) => {
			state.query = query
		}	
	},

	actions: {
		SET_MOVIES: ({commit}, param) => {
			commit('SET_LOADING', true)
			axios
        .get(`https://dev-drupal-api-hoanganh.pantheonsite.io/movie${param}`)
        .then((res) => {
					console.log(res)
					if (res.status === 200) {
            const movies = res.data
            commit('SET_MOVIES', movies)
          }
          else {
            commit('SET_MSG_ERROR', res.data.Error)            
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (commit('SET_LOADING', false)))
		},
		DELETE_MOVIE: ({commit}, id) => {
			const user = JSON.parse(localStorage.getItem('user'))
			const csrfToken = user.csrf_token
			axios
				.delete(`https://dev-drupal-api-hoanganh.pantheonsite.io/jsonapi/node/movie/${id}`,{}, {
					headers: {
						'Content-Type': 'application/vnd.api+json',
					}
				})
				.then(() => console.log('Xoa thanh cong'))
				.catch((error) => {
          console.log(error);
        })
		}	
	},
	

	getters: {

	}

}