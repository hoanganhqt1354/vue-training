<template >
  <div class="login container">
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
.login {
  display: flex;
  justify-content: flex-end;
}
.login a.btn {
  margin-right: 20px;
}
.logout {
  background-color: black;
}
</style>