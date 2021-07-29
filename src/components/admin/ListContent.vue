<template>
<main>
  <Header/>
  <div class="container">
    <router-link class="btn btn-primary mb-2" to="/manage/content/add">+ Add</router-link>
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
            
            <router-link class="btn btn-secondary mt-0" to="">Edit</router-link>        
            <button type="button" class="btn btn-danger ml-2" @click="handleDelete(movie.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from '.././Header.vue'
export default {
  name: 'ListContent',
  components: {
    Header,
  },
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
      if(confirm("Do you really want to delete?")){
        this.deleteData(id)
      }
      
    }

  },

  created() {
    this.fetchData(`?title=`)
  },
}
</script>

<style scoped src="../.././assets/dist/css/bootstrap.min.css">

</style>
