import axios from 'axios'
/* eslint-disable */

const basic = localStorage.getItem('basic')


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
          if (res.status === 200) {
            const movies = res.data
            commit('SET_MOVIES', movies)
          }
          else {
            commit('SET_MSG_ERROR', 'Error')            
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (commit('SET_LOADING', false)))
    },

    ADD_MOVIE: ({commit}, object_movie) => {
      const body = {
        "data": {
          "type": "node--movie",
          "attributes": {
            "title": object_movie.title,
            "field_overview": object_movie.overview,
            "field_date": object_movie.date
          }
        }
      }
      axios({
        method: 'post',
        url: `https://dev-drupal-api-hoanganh.pantheonsite.io/jsonapi/node/movie`,
        data: body,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Authorization': basic,
        }
      }).then(() => console.log('Them thanh cong'))
      .catch((error) => {
        console.log("Loi ne", error);
      });
        
    },



    DELETE_MOVIE: ({commit, dispatch}, id) => {
      axios({
        method: 'delete',
        url: `https://dev-drupal-api-hoanganh.pantheonsite.io/node/${id}?_format=json`,
        headers: {
          'Authorization': basic,
        }
      }).then(() => {
        console.log('Xoa thanh cong')
        dispatch('SET_MOVIES','?title=')
      })
      .catch((error) => {
        console.log("Loi ne", error);
      });
        
    },

  },
  

  getters: {

  }

}