<template>
  <div class="jumbotron min-vh-100">
    <h1>List of players</h1>
    <div v-for="(player, index) in players" :key="index" class="container-fluid">
      <div class="row" style="margin-bottom: 5px;">
        <div class="btn-group">
          <span
            class="input-group-text text-ligth"
            style="width: 450px;"
            disabled="disabled"
          >{{ player.name }}</span>
          <button @click="selectPlayer(player)" class="btn btn-info">Select</button>
          <button @click="removePlayer(index)" class="btn btn-danger">Remove</button>
        </div>
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
      players: this.$store.getters.players
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
  }
};
</script>
<style scoped></style>
