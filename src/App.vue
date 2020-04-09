<template>
  <div id="app">
    <div class="container">
        <AppHeader></AppHeader>
        <router-view />
    </div>
  </div>
</template>
<script>
import AppHeader from './components/Header.vue';
export default {
  components: {
    AppHeader
  }
}
</script>
<style>

</style>
