<template>
  <div>
    <input type="text" v-model="playerName" />
    <button @click="createPlayer">Create Player</button>
    <button @click="navigateToQuiz">Quiz</button>
    <button @click="navigateToPlayers">Players</button>
    <button @click="navigateToStats">Stats</button>
    <button @click="navigateToCreator">Quiz creator</button>
  </div>
</template>
<script>
import Player from "../../components/model/Player.js";

export default {
  data() {
    return {
      playerName: "",
    };
  },

  methods: {
    createPlayer() {
      let player = new Player(this.playerName);
      this.$store.dispatch("addPlayer", player);
      this.$store.commit("selectPlayer", player);
      this.playerName = "";
      return player;
    },
    navigateToQuiz() {
      return this.$router.push("/quiz-menu");
    },
    navigateToPlayers() {
      return this.$router.push("/players");
    },
    navigateToStats() {
      return this.$router.push("/stats");
    },
    navigateToCreator() {
      return this.$router.push("/question-creator");
    },
  },
};
</script>
<style scoped></style>
