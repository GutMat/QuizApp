<template>
  <div>
    <h1>Home Component</h1>
    <button @click="navigateToQuiz">Quiz</button>
    <button @click="navigateToPlayers">Players</button>
    <button @click="navigateToStats">Stats</button>
    <button @click="navigateToCreator">Quiz creator</button>
  </div>
</template>
<script>
export default {
  methods: {
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
