<template>
  <div>
    <button @click="loadData">Load Data</button>
    <button @click="displayData">Display Data</button>
    <div>
      <AppQuiz
        v-for="(question, index) in quiz"
        :key="index"
        :question="question.question"
        :correct="question.correct_answer"
        :incorrect="question.incorrect_answers"
      ></AppQuiz>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import AppQuiz from "../../components/quiz/Quiz.vue";
export default {
  data() {
    return {
      quiz: []
    };
  },
  components: {
    AppQuiz
  },
  methods: {
    ...mapActions({
      fetchData: "loadData"
    }),
    loadData() {
      this.fetchData();
    },
    displayData() {
      const quiz = this.$store.getters.trivias;
      this.quiz = quiz.results;
    },
  }
};
</script>
<style scoped>
</style>