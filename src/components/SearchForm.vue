<template>
  <form class="search-form" @submit.prevent="handleSearch">
    <h2>search movies</h2>
   <!--  <input type="text" class="form-input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/> -->
    <input type="text" class="form-input" v-model="query"/>
    <!-- <div v-if="error.show" class="error">{{ error.msg }}</div> -->
  </form>
</template>

<script>

export default {
  computed: {
    query: {
      get ()   {
      return this.$store.state.movies.query
      },
      set (value) {
        this.$store.commit('SET_QUERY', value)
        this.$store.dispatch('SET_MOVIES', `?title=${value}`)
      }
    }
  }
}
</script>

<style scoped src=".././assets/index.css">

</style>