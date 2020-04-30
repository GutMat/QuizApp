<template>
  <div id="app">
    <AppHeader></AppHeader>
    <div class="container-full-width">
      <router-view />
    </div>
  </div>
</template>
<script>
import AppHeader from "./components/shared/Header.vue";
export default {
  components: {
    AppHeader
  }
};
</script>
<style></style>
