<template>
    <div v-if="loading" class='loading'></div>
    <div v-else-if="error.show" class="page-rror">
      <h1>{{ error.msg }}</h1>
       <router-link to="/" class="btn">Back to Home</router-link>
    </div>
    <section v-else className="single-movie">
    <img :src="movie.Poster" :alt="movie.Title" />
    <div className="single-moive-info">
      <h2>{{movie.Title}}</h2>
      <p>{{movie.Plot}}</p>
      <h4>{{movie.Year}}</h4>
      <router-link to="/" class="btn">Back to Home</router-link>
    </div>
  </section>    
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      id: '',
      movie: {},
      loading: false,
      error: {
        show:false,
        msg:''
      },
    }
  },
  methods: {
    fetchSingleMovie() {
      this.loading = true
      const fetchedId = this.$route.params.id
      axios
        .get(`https://www.omdbapi.com/?apikey=${process.env.VUE_APP_MOVIE_API_KEY}&i=${fetchedId}`)
        .then((res) => {
          if (res.data.Response === 'True') {
            this.movie = res.data
            this.error = {
              show : false,
              msg: ''
            }
          }
          else {
            console.log(res.data);
            this.error = {
              show : true,
              msg: res.data.Error
            }
          }
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false))
    }
  },
  created() {
    this.fetchSingleMovie()
  }
  
}

</script>

<style lang="scss" scoped>

</style>