<template>
  <div>
    <input type="text" v-model="playerName" />
    <button @click="createPlayer">Create Player</button>
    <div>
      <h3>List of players</h3>
      <div v-for="(player, index) in players" :key="index">
        <span>{{ player.name }}</span>
        <button @click="selectPlayer(player)">Select</button>
        <button @click="removePlayer(index)">Remove</button>
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
    removePlayer(index) {
      this.$store.commit("removePlayer", index);
    },
    selectPlayer(player) {
      this.$store.commit("selectPlayer", player);
    }
  },
};
</script>
<style scoped></style>
