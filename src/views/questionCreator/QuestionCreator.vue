<template>
  <div>
    <button @click="isQuestionFormVisible = !isQuestionFormVisible">
      Add Question
    </button>
    <button @click="isQuestionManagementVisible = !isQuestionManagementVisible">
      Manage Question
    </button>
    <div v-if="isQuestionFormVisible">
      <form v-on:submit.prevent>
        <label>Question:</label>
        <input type="text" v-model="question" /><br /><br />
        <p>{{ question }}</p>
        <label>Correct Answer:</label>
        <input type="text" v-model="answers.correctAnswer" /><br /><br />
        <label>Incorrect Answer 1:</label>
        <input type="text" v-model="incorrectAnswerFirst" /><br /><br />
        <label>Incorrect Answer 2:</label>
        <input type="text" v-model="incorrectAnswerSecond" /><br /><br />
        <label>Incorrect Answer 3:</label>
        <input type="text" v-model="incorrectAnswerThird" /><br /><br />
        <p>{{ answers }}</p>
        <button @click="saveQuestion">Add question</button>
      </form>
      <p>{{ questions }}</p>
    </div>
    <div v-if="isQuestionManagementVisible">Temp Question List</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      questions: [],
      question: "",
      incorrectAnswerFirst: "",
      incorrectAnswerSecond: "",
      incorrectAnswerThird: "",
      answers: {
        correctAnswer: "",
        incorrectAnswers: [],
      },
      isQuestionFormVisible: false,
      isQuestionManagementVisible: false,
    };
  },
  methods: {
    saveQuestion() {
      let tempIncorrectAnswers = [
        this.incorrectAnswerFirst,
        this.incorrectAnswerSecond,
        this.incorrectAnswerThird,
      ];
      this.answers.incorrectAnswers = tempIncorrectAnswers;
      let tempQuestions = this.questions;
      tempQuestions.push({
        question: this.question,
        correct: this.answers.correctAnswer,
        incorrect: this.answers.incorrectAnswers,
      });
      console.log(this.questions);
    },
  },
};
</script>
<style scoped></style>
