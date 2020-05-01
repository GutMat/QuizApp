<template>
  <div class="jumbotron d-flex align-items-center min-vh-100 justify-content-center">
    <div class="col-6 input-group">
      <input
        type="text"
        v-model="playerName"
        class="form-control form-control-lg"
        placeholder="Type in player name"
        aria-label="Type in player name"
        aria-describedby="basic-addon2"
      />
      <div class="input-group-append">
        <button @click="createPlayer" class="btn btn-lg btn-outline-secondary">Create Player</button>
        <button @click="playAnonymously" class="btn btn-lg btn-outline-secondary">Play Anonymously</button>
      </div>
    </div>
  </div>
</template>
<script>
import Player from "../../components/model/Player.js";

export default {
  data() {
    return {
      playerName: ""
    };
  },

  methods: {
    playAnonymously() {
      let player = new Player("default");
      this.$store.commit("selectPlayer", player);
      this.navigateToQuiz();
    },
    createPlayer() {
      let player = new Player(this.playerName);
      this.$store.dispatch("addPlayer", player);
      this.$store.commit("selectPlayer", player);
      this.playerName = "";
      this.navigateToQuiz();
      return player;
    },
    navigateToQuiz() {
      return this.$router.push("/quiz-menu");
    },
    navigateToCreator() {
      return this.$router.push("/question-creator");
    }
  }
};
</script>
<style scoped></style>
