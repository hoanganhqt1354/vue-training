import axios from 'axios'

export default {
	state: {
		movies: [],
    loading: false,
    query: 'superman',
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
        .get(`https://www.omdbapi.com/?apikey=${process.env.VUE_APP_MOVIE_API_KEY}${param}`)
        .then((res) => {
					if (res.data.Response === 'True') {
            const movies = res.data.Search || res.data
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
		}
	},
	

	getters: {

	}

}