<template>
  <div class="jumbotron min-vh-100">
    <h1>Stats of Players</h1>
    <div class="col-12 col-sm-10 col-md-8 col-xl-6 col-lg-7" style="margin-top: 30px; margin-left: -15px ">
      <ul class="list-group">
        <li
          class="list-group-item list-group-item-secondary"
          v-for="(player, index) in players"
          :key="index"
        >
          <strong>{{ player.name }}</strong>
          <div style="float: right">
            <strong>score:</strong>
            {{ player.score }}/{{ player.clicks }} ({{
              player.clicks > 0
                ? ((player.score / player.clicks) * 100).toFixed(2) + "%"
                : "No stats yet"
            }}
            )
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      players: this.$store.getters.players.sort((a, b) => b.score - a.score),
    };
  },
};
</script>
<style scoped></style>
