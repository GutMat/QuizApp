<template>
  <div>
    <div v-if="isMenuVisible">
      <button @click="displayTrivia">Trivia</button>
      <button @click="displayFlagQuiz">Country-Flag Quiz</button>
      <button @click="displayOwnerQuiz">User Quiz</button>
    </div>

    <div v-if="isCountryQuizVisible">
      <h3>Country-Flag Quiz</h3>

      <CountryQuiz :key="index" :flagQuiz="flagQuiz"></CountryQuiz>
      <button @click="goBack">Back</button>
      <button @click="next">Next</button>
    </div>

    <div v-if="isTriviaQuizVisible">
      <h3>Trivia</h3>
      <h5>Choose category</h5>

      <div>
        <select v-model="selectedCategory">
          <option
            v-for="(category, index) in triviaCategories[0]"
            :value="category.id"
            :key="index"
            >{{ category.name }}</option
          >
        </select>
        <p>{{ selectedCategory }}</p>
        <select v-model="selectedDifficulty">
          <option value>Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <p>
          {{ selectedDifficulty == "" ? "Any Difficulty" : selectedDifficulty }}
        </p>
        <h5>Number of questions</h5>
        <input type="number" min="1" max="50" v-model.number="questionAmount" />
        <p>{{ questionAmount }}</p>
      </div>

      <button @click="displayQuiz">Display quiz</button>

      <div v-if="isQuizVisible">
        {{ trivia }}
        <AppQuiz
          v-for="(question, index) in trivia[1]"
          :key="index"
          :question="question.question"
          :correct="question.correct_answer"
          :incorrect="question.incorrect_answers"
        ></AppQuiz>
      </div>

      <button @click="goBack">Back</button>
    </div>

    <div v-if="isOwnerQuizVisible">
      <div v-for="(ele, index) in ownerQuiz" :key="index">
        <AppQuiz
          v-for="(question, index) in ele"
          :key="index"
          :question="question.question"
          :correct="question.correct"
          :incorrect="question.incorrect"
        ></AppQuiz>
      </div>
      <button @click="goBack">Back</button>
      {{ ownerQuiz == [] ? "There is no user question" : null }}
    </div>
  </div>
</template>
<script>
import AppQuiz from "../../components/quiz/Quiz.vue";
import CountryQuiz from "../../components/countryquiz/CountryQuiz.vue";
export default {
  data() {
    return {
      isMenuVisible: true,
      isCountryQuizVisible: false,
      isTriviaQuizVisible: false,
      isOwnerQuizVisible: false,
      isQuizVisible: false,
      triviaCategories: [],
      selectedCategory: "",
      questionAmount: 1,
      selectedDifficulty: "",
      trivia: [],
      ownerQuiz: [],
      countryFlags: [],
      flagQuiz: {
        correctFlag: {},
        incorrectFlags: [],
      },
    };
  },
  components: {
    AppQuiz,
    CountryQuiz,
  },
  methods: {
    next() {
      console.log(this.players);

      this.generateRandomFlagQuiz(this.countryFlags);
    },
    generateRandomNumber(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    generateRandomFlagQuiz(countryFlags) {
      let rndCorrectFlagIndex = this.generateRandomNumber(
        countryFlags.length - 1
      );

      this.flagQuiz = {
        correctFlag: countryFlags[rndCorrectFlagIndex],
        incorrectFlags: [
          countryFlags[this.generateRandomNumber(countryFlags.length - 1)].name,
          countryFlags[this.generateRandomNumber(countryFlags.length - 1)].name,
          countryFlags[this.generateRandomNumber(countryFlags.length - 1)].name,
        ],
      };
    },
    displayTrivia() {
      this.$http
        .get("https://opentdb.com/api_category.php")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const categories = [];
          for (let key in data) {
            categories.push(data[key]);
          }
          console.log(categories);
          this.triviaCategories = categories;
          this.isTriviaQuizVisible = true;
          this.isMenuVisible = false;
        });
    },
    displayFlagQuiz() {
      this.$http
        .get("https://restcountries.eu/rest/v2/all?fields=name;flag")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const countryFlags = [];
          for (let key in data) {
            countryFlags.push(data[key]);
          }
          console.log(countryFlags);
          this.countryFlags = countryFlags;
          this.isCountryQuizVisible = true;
          this.isMenuVisible = false;
          this.generateRandomFlagQuiz(this.countryFlags);
        });
    },

    displayOwnerQuiz() {
      this.ownerQuiz = this.$store.getters.quiz;
      this.isOwnerQuizVisible = true;
      this.isMenuVisible = false;
    },
    goBack() {
      this.isTriviaQuizVisible = false;
      this.isCountryQuizVisible = false;
      this.isOwnerQuizVisible = false;
      this.isMenuVisible = true;
      this.selectedCategory = "";
      this.trivia = [];
    },
    displayQuiz() {
      this.$http
        .get(
          "https://opentdb.com/api.php?amount=" +
            this.questionAmount +
            "&category=" +
            this.selectedCategory +
            "&difficulty=" +
            this.selectedDifficulty +
            "&type=multiple"
        )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const questions = [];
          for (let key in data) {
            questions.push(data[key]);
          }
          console.log(questions);
          this.trivia = questions;
          this.isQuizVisible = true;
        });
    },
  },
};
</script>
<style scoped></style>
