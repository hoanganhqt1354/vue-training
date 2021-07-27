import { createStore } from 'vuex';
import movies from './modules/movies';
import account from './modules/account';

const store = createStore({
  modules: {
		movies,
		account
  }
});

export default store
