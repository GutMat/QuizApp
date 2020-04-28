<template>
  <div>
    <div v-if="isQuestionCreatoreMenuIsVisible">
      <button @click="displayQuestionForm">
        Add Question
      </button>
      <button @click="displayQuestionManagement">
        Manage Question
      </button>
    </div>
    <div v-if="isQuestionFormVisible">
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
      <button @click="backToMenu">Back</button>
    </div>
    <div v-if="isQuestionManagementVisible">
      <p id="quizVuex">{{ quizGetters }}</p>
      <button @click="backToMenu">Back</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quiz: [],
      question: "",
      quizGetters: this.$store.getters.quiz,
      incorrectAnswerFirst: "",
      incorrectAnswerSecond: "",
      incorrectAnswerThird: "",
      answers: {
        correctAnswer: "",
        incorrectAnswers: [],
      },
      isQuestionCreatoreMenuIsVisible: true,
      isQuestionFormVisible: false,
      isQuestionManagementVisible: false,
    };
  },
  methods: {
    displayQuestionForm() {
      this.isQuestionFormVisible = true;
      this.isQuestionCreatoreMenuIsVisible = false;
    },
    displayQuestionManagement() {
      this.isQuestionManagementVisible = true;
      this.isQuestionCreatoreMenuIsVisible = false;
    },
    backToMenu() {
      this.isQuestionCreatoreMenuIsVisible = true;
      this.isQuestionFormVisible = false;
      this.isQuestionManagementVisible = false;
    },
    saveQuestion() {
      this.quiz = [];
      let tempIncorrectAnswers = [
        this.incorrectAnswerFirst,
        this.incorrectAnswerSecond,
        this.incorrectAnswerThird,
      ];
      this.answers.incorrectAnswers = tempIncorrectAnswers;
      let tempQuestions = [];
      tempQuestions.push({
        question: this.question,
        correct: this.answers.correctAnswer,
        incorrect: this.answers.incorrectAnswers,
      });
      this.quiz = tempQuestions;
      console.log(this.quiz);
      alert("Question successfully added");
      this.question = "";
      this.incorrectAnswerFirst = "";
      this.incorrectAnswerSecond = "";
      this.incorrectAnswerThird = "";
      this.answers.correctAnswer = "";
      this.answers.incorrectAnswers = [];
      this.$store.commit("addQuestion", this.quiz);
    },
  },
};
</script>
<style scoped></style>
