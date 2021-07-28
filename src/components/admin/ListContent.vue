<template>
  <div class="container">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Title</th>
        <th scope="col">Operation</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.id">
        <th scope="row">{{movie.id}}</th>
        <td>{{movie.title}}</td>
        <td>
          <span>
            <router-link to="">Edit</router-link>
          </span>
          <span @click="handleDelete(movie.id)">
            Delete
          </span>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
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
      fetchData: 'SET_MOVIES',
      deleteData: 'DELETE_MOVIE'
    }),

    handleDelete(id) {
      this.deleteData(id)
    }

  },

  created() {
    this.fetchData(`?title=`)
  },
}
</script>

<style scoped src="../.././assets/dist/css/bootstrap.min.css">
body {
  background: white;
}
</style>
