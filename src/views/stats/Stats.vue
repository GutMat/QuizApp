<template>
  <div>
    <h1>Stats Component</h1>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(player, index) in players"
        :key="index"
      >{{player.score}} | {{player.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      players: this.$store.getters.players.sort((a, b) => b.score - a.score)
    };
  }
};
</script>
<style scoped>
</style>