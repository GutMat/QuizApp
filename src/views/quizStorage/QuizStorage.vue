<template>
  <div>
    <div v-if="isMenuVisible">
      <button @click="displayTrivia">Trivia</button>
      <button @click="displayFlagQuiz">Country-Flag Quiz</button>
    </div>
    <div v-if="isCountryQuizVisible">
      <h3>Country-Flag Quiz</h3>
      <button @click="displayFlagQuiz">Back</button>
    </div>
    <div v-if="isTriviaQuizVisible">
      <h3>Trivia</h3>
      <button @click="displayTrivia">Back</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isMenuVisible: true,
      isCountryQuizVisible: false,
      isTriviaQuizVisible: false,
    };
  },
  methods: {
    displayTrivia() {
      this.isTriviaQuizVisible = !this.isTriviaQuizVisible;
      this.isMenuVisible = !this.isMenuVisible;
    },
    displayFlagQuiz() {
      this.isCountryQuizVisible = !this.isCountryQuizVisible;
      this.isMenuVisible = !this.isMenuVisible;
    },
  },
};
</script>
<style scoped></style>
