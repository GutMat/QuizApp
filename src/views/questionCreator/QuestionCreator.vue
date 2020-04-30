<template>
  <div class="jumbotron d-flex align-items-center min-vh-100 justify-content-center pt-0">
    <div v-if="isQuestionCreatoreMenuIsVisible" class="btn-group">
      <button @click="displayQuestionForm" class="btn btn-lg btn-outline-secondary">Add Question</button>
      <button
        @click="displayQuestionManagement"
        class="btn btn-lg btn-outline-secondary"
      >Manage Question</button>
    </div>
    <div v-if="isQuestionFormVisible" class="col-12">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light">Question:</span>
        </div>
        <input type="text" v-model="question" class="form-control" aria-label="Type in question" />
      </div>
      <p>{{ question }}</p>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-success text-light">Correct Answer:</span>
        </div>
        <input
          type="text"
          v-model="answers.correctAnswer"
          class="form-control"
          aria-label="Type in correct answer"
        />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-danger text-light">Incorrect Answer:</span>
        </div>
        <input
          type="text"
          v-model="incorrectAnswerFirst"
          class="form-control"
          aria-label="Type in correct answer"
        />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-danger text-light">Incorrect Answer:</span>
        </div>
        <input
          type="text"
          v-model="incorrectAnswerSecond"
          class="form-control"
          aria-label="Type in incorrect answer"
        />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-danger text-light">Incorrect Answer:</span>
        </div>
        <input
          type="text"
          v-model="incorrectAnswerThird"
          class="form-control"
          aria-label="Type in incorrect answer"
        />
      </div>
      <p>{{ answers }}</p>
      <div class="btn-group">
        <button @click="backToMenu" class="btn btn-sm btn-secondary btn">Back</button>
        <button @click="saveQuestion" class="btn btn-sm btn-secondary btn">Add question</button>
      </div>
    </div>
    <div v-if="isQuestionManagementVisible">
      {{ quizGetters.length == [] ? "There is no user question" : null }}
      <div v-for="(ele, index) in quizGetters" :key="index">
        <div v-for="(question, index) in ele" :key="index">
          <h5>Question: {{ question.question }}</h5>
          <h6>Correct:</h6>
          <span>{{ question.correct }}</span>
          <h6>Incorrect:</h6>
          <div v-for="(answer, index) in question.incorrect" :key="index">
            <span>{{ answer }}</span>
          </div>
        </div>
        <button @click="removeQuestion(index)">Remove question</button>
      </div>
      <button @click="backToMenu">Back</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quiz: [],
      quizGetters: this.$store.getters.quiz,
      question: "",
      incorrectAnswerFirst: "",
      incorrectAnswerSecond: "",
      incorrectAnswerThird: "",
      answers: {
        correctAnswer: "",
        incorrectAnswers: []
      },
      isQuestionCreatoreMenuIsVisible: true,
      isQuestionFormVisible: false,
      isQuestionManagementVisible: false
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
        this.incorrectAnswerThird
      ];
      this.answers.incorrectAnswers = tempIncorrectAnswers;
      let tempQuestions = [];
      tempQuestions.push({
        question: this.question,
        correct: this.answers.correctAnswer,
        incorrect: this.answers.incorrectAnswers
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
    removeQuestion(index) {
      this.$store.commit("removeQuestion", index);
    }
  }
};
</script>
<style scoped>
span {
  width: 150px;
}
</style>
