<template>
  <div
    class="jumbotron d-flex align-items-center min-vh-100 justify-content-center pt-0"
  >
    <div v-if="isQuestionCreatoreMenuIsVisible" class="btn-group">
      <button
        @click="displayQuestionForm"
        class="btn btn-lg btn-outline-secondary"
      >
        Add Question
      </button>
      <button
        @click="displayQuestionManagement"
        class="btn btn-lg btn-outline-secondary"
      >
        Manage Question
      </button>
      <button @click="importFromDB" class="btn btn-lg btn-outline-secondary">
        Import questions
      </button>
    </div>
    <div
      v-if="isQuestionFormVisible"
      class="col-12 col-sm-12 col-md-11 col-lg-9 col-xl-7"
      style="margin: auto"
    >
      <h1>Question Creator</h1>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light"
            >Question:</span
          >
        </div>
        <input
          type="text"
          v-model="question"
          class="form-control"
          aria-label="Type in question"
        />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-success text-light"
            >Correct Answer:</span
          >
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
          <span class="input-group-text bg-danger text-light"
            >Incorrect Answer:</span
          >
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
          <span class="input-group-text bg-danger text-light"
            >Incorrect Answer:</span
          >
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
          <span class="input-group-text bg-danger text-light"
            >Incorrect Answer:</span
          >
        </div>
        <input
          type="text"
          v-model="incorrectAnswerThird"
          class="form-control"
          aria-label="Type in incorrect answer"
        />
      </div>
      <div>
        <button @click="saveQuestion" class="btn btn-md btn-primary btn">
          Add question
        </button>
        <button
          @click="backToMenu"
          class="btn btn-md btn-dark btn"
          style="float: right"
        >
          Back
        </button>
      </div>
    </div>
    <div v-if="isQuestionManagementVisible">
      <h4>
        {{ quizGetters.length == [] ? "There is no user question" : "Question Management" }}
      </h4>
      <div class="card-group">
        <div v-for="(ele, index) in quizGetters" :key="index">
          <div
            v-for="(question, index) in ele"
            :key="index"
            class="card bg-secondary"
            style="margin: 10px"
          >
            <div class="card-header bg-dark text-white">
              Question: {{ question.question }}
            </div>
            <h6 class="card-title">Correct:</h6>
            <span class="card-text">{{ question.correct }}</span>
            <br />
            <h6 class="card-title">Incorrect:</h6>
            <div v-for="(answer, index) in question.incorrect" :key="index">
              <span class="card-text">{{ answer }}</span>
            </div>
            <button @click="removeQuestion(index)" class="btn btn-danger">
              Remove question
            </button>
          </div>
        </div>
      </div>

      <div v-if="isQuestionsAvailable">
        <button @click="exportToDB" class="btn btn-md btn-success col-12">
          Export questions
        </button>
      </div>

      <button @click="backToMenu" class="btn btn-md btn-dark col-12">
        Back
      </button>
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
    removeQuestion(index) {
      this.$store.commit("removeQuestion", index);
    },
    exportToDB() {
      this.$http
        .post(
          "https://quizapp-1c4de.firebaseio.com/questions.json",
          this.quizGetters
        )
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    importFromDB() {
      this.$http
        .get("https://quizapp-1c4de.firebaseio.com/questions.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          for (let key in data) {
            for (let index = 0; index < data[key].length; index++) {
              this.$store.commit("addQuestion", data[key][index]);
            }
          }
        });
    },
  },
  computed: {
    isQuestionsAvailable() {
      if (this.quizGetters.length == []) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
<style scoped>
span {
  width: 150px;
}
</style>
