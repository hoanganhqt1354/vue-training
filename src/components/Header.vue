<template >
  <div v-if="loggedIn" class="container">
     <router-link class="btn btn-primary" :to="link">{{ title }}</router-link>
  </div>
  <div class="login container d-flex flex-row-reverse">
    <router-link v-if="!loggedIn" class="btn" to="/user/login">Login</router-link>
    <div v-else>Welcome, {{ userInfo.name }} 
      <button type="button" class="btn logout" @click="handleClickLogOut">Log out</button>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Header',
  computed:{
    ...mapState({
      loggedIn: state => state.account.status.loggedIn,
      userInfo: state => state.account.user.current_user
    })
  },

  props: [
    'title',
    'link',
  ],


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
<style>
.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  } 
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

.login {
  display: flex;
  justify-content:  flex-end;
}
</style>