<template>
<main>
    <div class="login">
      <router-link v-if="!loggedIn" class="btn" to="/user/login">Login</router-link>
      <div v-else>Welcome, {{ userInfo.name }} 
        <button @click="handleClickLogOut">Log out</button>
      </div>
    </div>
    <SearchForm/>
    <Movies/>
</main>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import Movies from './Movies.vue'
import SearchForm from './SearchForm.vue'

export default {
  name: 'Home',
  components: {
    Movies,
    SearchForm,
  },
  computed:{
    ...mapState({
      loggedIn: state => state.account.status.loggedIn,
      userInfo: state => state.account.user.current_user
    })
  },

  methods: {
    ...mapActions({
      logOut: 'LOG_OUT'
    }),

    handleClickLogOut() {
      this.logOut()
    }
  }

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
