<template>
<main>
    <SearchForm v-model="query" :error="error"/>
    <Movies :loading="loading" :movies="movies" />
</main>
</template>

<script>
import axios from 'axios'
import Movies from './Movies.vue'
import SearchForm from './SearchForm.vue'

export default {
  name: 'Home',

  data() {
    return {
      movies: [],
      loading: false,
      query: 'superman',
      error: {
        show:false,
        msg:''
      }
    }
  },

  components: {
    Movies,
    SearchForm,
  },
  methods: {
    fetchData() {
      this.loading = true
      axios
        .get(`https://www.omdbapi.com/?apikey=${process.env.VUE_APP_MOVIE_API_KEY}&s=${this.query}`)
        .then((res) => {
          if (res.data.Response === 'True') {
            this.movies = res.data.Search || res.data
            this.error = {
              show : false,
              msg: ''
            }
          }
          else {
            this.error = {
              show : true,
              msg: res.data.Error
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.loading = false))
    },
  },
  watch: {
    query() {
      this.fetchData()
    }
  },

  created() {
    this.fetchData()
  },

  
}
</script>

<style scoped>
</style>
