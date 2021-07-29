<template>
  <div class="container">
    <form  @submit.prevent="">
      <h1>Add data</h1>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" placeholder="" v-model="title">
      </div>
      <div class="form-group">
        <label for="overview">Overview</label>
        <textarea class="form-control" id="overview" rows="3" v-model="overview"></textarea>
      </div>
      <div class="form-group">
        <label for="title">Date</label>
        <input type="date" class="form-control" id="date" placeholder="" v-model="date">
      </div>
      <button class="btn btn-primary" @click="handleAdd">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex' 
export default {

  name: 'FormAdd',

  data() {
    return {
      title: '',
      overview: '',
      date: '',
    };
  },

  methods: {
    ...mapActions({
      addMovie: 'ADD_MOVIE'
    }),

    handleAdd () {
      if (this.title && this.overview && this.date) {
        const movie = {
          title: this.title,
          overview: this.overview,
          date: this.date
        }
        this.addMovie(movie) 
      }
      
    }
  },
};
</script>

<style scoped src="../.././assets/dist/css/bootstrap.min.css">
</style>
