<template>
  <div v-if="loading" class='loading'></div>
  <section v-else class="movies">
      <router-link class="movie" v-for="movie in movies" :key="movie.id" :to="{ name: 'SingleMovie', params: { id: movie.id }}">
          <article>
              <img :src="movie.poster" :alt="movie.title" />
              <div class="movie-info">
                  <h4 class="title">
                      {{ movie.title }}
                  </h4>
                  <p>{{ movie.year }}</p>
              </div>
          </article>
      </router-link>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      movies: state => state.movies.movies,
      loading: state => state.movies.loading,
      query: state => state.movies.query,
    })
  },

  methods: {
    ...mapActions({
      fetchData: 'SET_MOVIES'
    })
  },

  created() {
    this.fetchData(`?title=${this.query}`)
  },
}
</script>

<style scoped>

</style>