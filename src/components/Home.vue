<template>
<main>
    <Header title="To list manage" link="/manage/content" />
    <SearchForm/>
    <Movies/>
</main>
</template>


<script>
import Movies from './Movies.vue'
import SearchForm from './SearchForm.vue'
import Header from './Header.vue'

export default {
  name: 'Home',
  components: {
    Movies,
    SearchForm,
    Header
  },
}
</script>

<style scoped>

</style>
