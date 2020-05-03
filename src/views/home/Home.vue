<template>
  <div class="jumbotron d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-xs-12">
      <div>
        <input
          type="text"
          v-model="playerName"
          class="form-control form-control-lg"
          placeholder="Type in player name"
          aria-label="Type in player name"
          aria-describedby="basic-addon2"
        />
      </div>

      <div class="input-group-append">
        <div class="btn-group">
          <button @click="createPlayer" class="btn btn-lg btn-outline-dark">Create Player</button>
          <button @click="playAnonymously" class="btn btn-lg btn-outline-dark">Play Anonymously</button>
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
    }
  }
};
</script>
<style scoped></style>
