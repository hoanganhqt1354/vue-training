<template>
  <div v-if="loading" class='loading'></div>
  <section v-else class="movies">
      <router-link class="movie" v-for="movie in movies" :key="movie.imdbID" :to="{ name: 'SingleMovie', params: { id: movie.imdbID }}">
          <article>
              <img :src="movie.Poster" :alt="movie.Title" />
              <div class="movie-info">
                  <h4 class="title">
                      {{ movie.Title }}
                  </h4>
                  <p>{{ movie.Year }}</p>
              </div>
          </article>
      </router-link>
  </section>
</template>

<script>

export default {
  props: ['movies', 'loading']
}
</script>

<style scoped>

</style>