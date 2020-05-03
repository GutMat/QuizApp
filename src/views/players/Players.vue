<template>
  <div class="jumbotron min-vh-100">
    <h1 style="margin-bottom: 20px">List of players</h1>
    <div v-for="(player, index) in players" :key="index">
      <div class="btn-group col-12 col-sm-10 col-md-8 col-xl-6 col-lg-7" style="margin-left: -15px">
        <span
          class="input-group-text col-6"
          style="font-weight: bold"
          disabled="disabled"
          >{{ player.name }}</span
        >
        <button
          @click="selectPlayer(player)"
          class="btn btn-info col-3"
        >
          Select
        </button>
        <button
          @click="removePlayer(index)"
          class="btn btn-danger col-3"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Player from "../../components/model/Player.js";
export default {
  data() {
    return {
      playerName: "",
      players: this.$store.getters.players,
    };
  },
  methods: {
    createPlayer() {
      let player = new Player(this.playerName);
      this.$store.dispatch("addPlayer", player);
      this.$store.commit("selectPlayer", player);
      return player;
    },
    removePlayer(index) {
      this.$store.commit("removePlayer", index);
    },
    selectPlayer(player) {
      this.$store.commit("selectPlayer", player);
    },
  },
};
</script>
<style scoped></style>
