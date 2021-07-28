<template>
    <div v-if="loading" class='loading'></div>
<!-- <div v-else-if="error.show" class="page-rror">
      <h1>{{ error.msg }}</h1>
       <router-link to="/" class="btn">Back to Home</router-link>
    </div> -->
    <section v-else className="single-movie" v-for="movie in movies" :key="movie.id">
    <img :src="movie.poster" :alt="movie.title" />
    <div className="single-moive-info">
      <h2>{{movie.title}}</h2>
      <p>{{movie.overview}}</p>
      <h4>{{movie.year}}</h4>
      <router-link to="/" class="btn">Back to Home</router-link>
    </div>
  </section>    
</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {

  computed: {
    ...mapState({
      movies: state => state.movies.movies,
      loading: state => state.movies.loading,
    })
  },

  methods: {
    ...mapActions({
      fetchData: 'SET_MOVIES'
    })
  },
  
  created() {
    const fetchedId = this.$route.params.id
    this.fetchData(`?id=${fetchedId}`)
  },
  
}

</script>

<style lang="scss" scoped>

</style>