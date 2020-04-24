<template>
  <div
    id="app"
    style="backgroundImage: url('https://scontent-frt3-1.xx.fbcdn.net/v/t1.15752-9/94129989_3774803345894149_7669253239082057728_n.png?_nc_cat=104&_nc_sid=b96e70&_nc_oc=AQljDqk-dM21h2q-7AxVgXbmCONpVEtGxGQqyXbDUfhhlPbv405g5hQ-13hwTHVpe6k&_nc_ht=scontent-frt3-1.xx&oh=d6c81c9849de2b967896dcb7d4f55575&oe=5EC83BB5'); height: 900px;"
  >
    <AppHeader></AppHeader>
    <div class="container-fluid">
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
<style>
</style>
