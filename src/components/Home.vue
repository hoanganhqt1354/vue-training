<template>
<main>
    <div class="login">
      <router-link class="btn" to="/user/login">Login</router-link>
    </div>
    <SearchForm/>
    <Movies/>
</main>
</template>

<script>

import Movies from './Movies.vue'
import SearchForm from './SearchForm.vue'

export default {
  name: 'Home',
  components: {
    Movies,
    SearchForm,
  },

}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: flex-end;
}
.login a.btn {
  margin-right: 20px;
}
</style>
