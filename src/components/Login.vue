<template>
  <div class="login-form">
    <h1>Login</h1>
    <form @submit.prevent="" autocomplete="off">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li class="danger" v-for="error in errors" :key="error.id">{{ error }}</li>
        </ul>
      </p>    
      <label>Username:</label>
      <input type="text" name="username" autocomplete="off" id="username" v-model="username">
      <label>Password:</label>
      <input type="password" name="password" autocomplete="off" id="password" v-model="password">
      <div class="danger" v-if="error.show">{{ error.msg }}</div>

      <div class="" v-if="load_checking">Checking...</div>
      <button v-else type="submit" @click="handleSubmit">Login</button>
    </form>
  </div>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {

  name: 'Login',

  data() {
    return {
      username: '',
      password: '',
      errors: [],
    };
  },

  computed: {
    ...mapState({
      load_checking: state => state.account.load_checking,
      error: state => state.account.error
    })
  },

  methods: {
    ...mapActions({
      handleLogin: 'LOG_IN'
    }),

    handleSubmit() {
      this.errors = []
      if (!this.username) {
        this.errors.push('Username required.');
      }
      if (!this.password) {
        this.errors.push('Password required.');
      }
      if (this.username && this.password) {
        const userInfo = {
          name: this.username,
          pass: this.password
        }
      this.handleLogin(userInfo)
      }
    }
  },


};
</script>

<style lang="css" scoped>
.login-form {
  margin-top: 200px;
  
}

.login-form h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  background: white;
  padding: 30px 20px;
}

.login-form input {
  padding: 5px;
}

.login-form button {
  margin-top: 20px;
  padding: 5px;
  align-self: center;
  width: 100px;
}
.danger {
  color: red;
}
</style>
