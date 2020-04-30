<template>
  <div class="jumbotron min-vh-100">
    <h1>Stats Component</h1>
    <ul class="list-group">
      <li
        class="list-group-item list-group-item-dark input-group"
        v-for="(player, index) in players"
        :key="index"
      >
        <div class="input-group-prepend">
          <span class="input-group-text">
            score:
            {{ player.score }}/{{ player.clicks }} ({{
            player.clicks > 0
            ? ((player.score / player.clicks) * 100).toFixed(2) + "%"
            : "No stats yet"
            }}
            )
          </span>
          <span class="input-group-text" style="width: 100px;">{{ player.name }}</span>
        </div>
      </li>
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
<style scoped></style>
