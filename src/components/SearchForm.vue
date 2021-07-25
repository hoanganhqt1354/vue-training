<template>
  <form class="search-form" @submit.prevent="handleSearch">
    <h2>search movies</h2>
    <input type="text" class="form-input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
    <div v-if="error.show" class="error">{{ error.msg }}</div>
  </form>
</template>

<script>
  export default {
    props: {
      modelValue: String,
      error: Object,
    },
    
  }
</script>

<style scoped>

</style>