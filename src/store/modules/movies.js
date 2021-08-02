import axios from 'axios'
import router from '../.././router'
import moment from 'moment'
/* eslint-disable */

const basic = localStorage.getItem('basic')
const currentDate = () => {
  return moment(String(new Date())).format('YYYY-MM-DD')
}

export default {
  state: {
    movies: [],
    loading: false,
    query: '',
    notification: {
      show: false,
      msg: ''
    },
    singleMovie: {}
  },

  mutations: {
    SET_MOVIES: (state, movies) => {
      state.movies = movies
    },

    SET_LOADING: (state, boolean) => {
      state.loading = boolean
    },

    SET_NOTIFICATION: (state, msg) => {
      state.notification = {
        show: true,
        msg
      }
    },

    SET_QUERY: (state, query) => {
      state.query = query
    },

    SET_SINGLE_MOVIES: (state, singleMovie) => {
      state.singleMovie = {...singleMovie, poster_fid: null}
      console.log(state.singleMovie)
    },

    DELETE_MOVIE: (state, id) => {
      state.movies = state.movies.filter((movie) => movie.id !== id)
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
            commit('SET_NOTIFICATION', 'Error')            
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (commit('SET_LOADING', false)))
    },

    ADD_MOVIE: ({commit}, object_movie) => {
      console.log(object_movie)
      let body = {
          "data": {
            "type": "node--movie",
            "id": object_movie.uuid,
            "attributes": {
              "title": object_movie.title,       
              "field_overview": object_movie.overview,
              "field_date": object_movie.date
            }
          }
        }

      if (object_movie.poster_fid !== null) {
        body = {
          "data": {
            "type": "node--movie",
            "attributes": {
              "title": object_movie.title,
              "field_overview": object_movie.overview || "",
              "field_date": object_movie.date
            },
            "relationships": {
              "field_image_poster": {
                "data": {
                  "type": "file--file",
                  "id": object_movie.poster_fid,

                }
              }
            }
          }
        }
      }    
      console.log(body)
      axios({
        method: 'post',
        url: `https://dev-drupal-api-hoanganh.pantheonsite.io/jsonapi/node/movie`,
        data: body,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Authorization': basic,
        }
      }).then(() => {
        router.push('/manage/content');
        commit('SET_NOTIFICATION', 'New movie have been added')
      })
      .catch((error) => {
        console.log("Error", error);
      });
        
    },

    EDIT_MOVIE: ({commit}, object_movie) => {
      let body = {
          "data": {
            "type": "node--movie",
            "id": object_movie.uuid,
            "attributes": {
              "title": object_movie.title,       
              "field_overview": object_movie.overview,
              "field_date": object_movie.date
            }
          }
        }  
      if (object_movie.poster_fid !== null) {
        body = {
          "data": {
            "type": "node--movie",
            "id": object_movie.uuid,
            "attributes": {
              "title": object_movie.title,       
              "field_overview": object_movie.overview,
              "field_date": object_movie.date
            },
            "relationships": {
              "field_image_poster": {
                "data": {
                  "type": "file--file",
                  "id": object_movie.poster_fid,

                }
              }
            }
          }
        }
      }    
      axios({
        method: 'patch',
        url: `https://dev-drupal-api-hoanganh.pantheonsite.io/jsonapi/node/movie/${object_movie.uuid}`,
        data: body,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Authorization': basic,
        }
      }).then(() => {
        router.push('/manage/content');
        commit('SET_NOTIFICATION', 'Movie have been edited')
      })
      .catch((error) => {
        console.log("Error", error);
      });
        
    },

    DELETE_MOVIE: ({commit, dispatch}, id) => {
      commit('SET_LOADING', true)
      commit('DELETE_MOVIE', id)
      axios({
        method: 'delete',
        url: `https://dev-drupal-api-hoanganh.pantheonsite.io/node/${id}?_format=json`,
        headers: {
          'Authorization': basic,
        }
      }).then(() => {
        commit('SET_NOTIFICATION', `Movie #${id} deleted`)
      })
      .catch((error) => {
        console.log("Error", error);
      })
      .finally(() => (commit('SET_LOADING', false)))
        
    },

    GET_SINGLE_MOVIE: ({commit}, id) => {
      commit('SET_LOADING', true)
      axios({
        method: 'get',
        url: `https://dev-drupal-api-hoanganh.pantheonsite.io/movie?uuid=${id}`
      }).then((res) => {
        if (res.status === 200) {
          console.log(res.data[0])
          commit('SET_SINGLE_MOVIES', res.data[0])
        }
      })
      .catch((error) => {
        console.log("Error", error);
      })
      .finally(() => (commit('SET_LOADING', false)))
    }

  },
  

  getters: {

  }

}