<template>
  <div>
    <input type="text" v-model="playerName" />
    <button @click="createPlayer">Create Player</button>
    <div>
      <p v-for="(player, index) in players" :key="index">{{ player }}</p>
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
  // computed: {
  //   playerName: function() {
  //     let playerName = event.target.playerName;
  //     return playerName;
  //   }
  // },
  methods: {
    createPlayer() {
      let player = new Player(this.playerName);
      this.$store.dispatch("addPlayer", player);
      this.$store.commit("selectPlayer", player);
      return player;
    },
  },
};
</script>
<style scoped></style>
