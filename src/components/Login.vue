<template>
	<div class="login-form">
		<h1>Login</h1>
		<form autocomplete="off">
			<label>Username:</label>
			<input type="text" name="username" autocomplete="off" id="username">
			<label>Password:</label>
			<input type="password" name="password" autocomplete="off" id="password">
			<button type="submit">Login</button>
		</form>
	</div>
	
</template>

<script>
export default {

  name: 'Login',

  data() {
    return {

    };
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
</style>
