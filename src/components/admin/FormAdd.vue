<template>
  <div class="container">
    <Header title="To list manage" link="/manage/content" />
    <div v-if="loading" class='loading'></div>
    <form v-else @submit.prevent="">
      <h1>{{ editing ? 'Edit' : "Add" }} data</h1>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" placeholder="" v-model="movie.title">
      </div>
      <div class="form-group">
        <label for="overview">Overview</label>
        <textarea class="form-control" id="overview" rows="3" v-model="movie.overview"></textarea>
      </div>
      <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
      <div id="preview">
        <img v-if="item.imageUrl" v-bind:src="item.imageUrl" />
        <img v-else v-bind:src="movie.poster" />
      </div>
      <div class="form-group">
        <label for="title">Date</label>
        <input type="date" class="form-control" id="date" placeholder="" v-model="movie.date">
      </div>
      <button class="btn btn-primary" @click="handleClick">{{ editing ? 'Edit' : "Add" }}</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import Header from '.././Header.vue' 
export default {

  name: 'FormAdd',
  components: {
    Header,
  },
  data() {
    return {
      error: [],
      editing: false,
      item:{
        image : null,
        imageUrl: null
      },
    };
  },

  computed:{
    ...mapState({
      movie: state => state.movies.singleMovie,
      loading: state => state.movies.loading,
    }),
  },

  methods: {
    ...mapActions({
      addMovie: 'ADD_MOVIE',
      editMovie: 'EDIT_MOVIE',
      getSingleMovie: 'GET_SINGLE_MOVIE'
    }),

    handleClick() {
      if(this.editing === true) {
        if (this.movie.title) {
          this.editMovie(this.movie) 
        }
      }
      else {
        if (this.movie.title) {
          this.addMovie(this.movie)
        }  
      }
    },

    uploadImage(e) {
      let image = e.target.files[0];
      this.image = image
      this.item.imageUrl = URL.createObjectURL(image)
      let formData = new FormData()
      formData.append('image', image)
      axios({
        method: 'post',
        url: `https://dev-drupal-api-hoanganh.pantheonsite.io/jsonapi/node/movie/field_image_poster`,
        data: image,
        headers: {
          'Authorization': 'Basic YWRtaW46MTIzNDU2',
          'Content-Type': 'application/octet-stream',
          'Accept': 'application/vnd.api+json',
          'Content-Disposition': `file; filename="${image.name}"`

        }
      }).then((res) => {
        this.movie.poster_fid = res.data.data.id
      })
      .catch((error) => {
        console.log("Error", error);
      });

    }
  },

  created() {
    if ("uuid" in this.$route.params) {
      this.editing = true;
      this.getSingleMovie(this.$route.params.uuid)
    }
  },
  unmounted() {
   this.$store.commit('SET_SINGLE_MOVIES', {})
  }
};
</script>

<style scoped src="../.././assets/dist/css/bootstrap.min.css">
</style>
