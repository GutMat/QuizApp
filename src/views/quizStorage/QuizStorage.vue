<template>
  <div class="jumbotron d-flex align-items-center min-vh-100 justify-content-center">
    <div v-if="isMenuVisible" class="btn-group">
      <button
        class="btn btn-lg btn-outline-secondary"
        @click="isPlayerListVisible = !isPlayerListVisible"
      >{{ isPlayerListVisible ? "Hide player list" : "Show player list" }}</button>
      <div v-if="isPlayerListVisible" class="input-group-lg">
        <select
          v-model="selectedPlayer"
          @change="updatePresentPlayer(selectedPlayer)"
          class="custom-select-lg"
        >
          <option :value="player" v-for="(player, index) in players" :key="index">{{ player.name }}</option>
        </select>
      </div>
      <button @click="displayTrivia" class="btn btn-lg btn-outline-secondary">Trivia</button>
      <button @click="displayFlagQuiz" class="btn btn-lg btn-outline-secondary">Country-Flag Quiz</button>
      <button @click="displayOwnerQuiz" class="btn btn-lg btn-outline-secondary">User Quiz</button>
    </div>

    <div v-if="isCountryQuizVisible">
      <h3>Country-Flag Quiz</h3>

      <CountryQuiz :flagQuiz="flagQuiz" @next="next"></CountryQuiz>
      <button @click="goBack" class="btn btn-sm btn-secondary">Back</button>
      <button @click="next" class="btn btn-sm btn-secondary">Next</button>
    </div>

    <div v-if="isTriviaQuizVisible">
      <h3>Trivia</h3>
      <h5>Choose category</h5>

      <div v-if="isQuizFormVisible" class="input-group-lg">
        <select v-model="selectedCategory" class="custom-select rounded">
          <option
            v-for="(category, index) in triviaCategories[0]"
            :value="category.id"
            :key="index"
          >{{ category.name }}</option>
        </select>
        <p>There is {{ selectedCategory }} questions of this category</p>
        <h5>Difficulty</h5>
        <select v-model="selectedDifficulty" class="custom-select rounded">
          <option selected="selected" value>Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <h5>Number of questions</h5>
        <input
          type="number"
          min="1"
          max="50"
          v-model.number="questionAmount"
          class="form-control"
          placeholder="Type in number of questions"
          aria-label="Type in number of questions"
          aria-describedby="basic-addon2"
        />
        <p>{{ questionAmount }}</p>
        <div class="btn-group">
          <button @click="goBack" class="btn btn-sm btn-secondary btn">Go Back</button>

          <button @click="displayQuiz" class="btn btn-sm btn-secondary">Display quiz</button>
        </div>
      </div>

      <div v-if="isQuizVisible">
        {{ trivia }}
        <AppQuiz
          :question="trivia[1][currentIndex].question"
          :correct="trivia[1][currentIndex].correct_answer"
          :incorrect="trivia[1][currentIndex].incorrect_answers"
          @incrementIndex="nextQuestion"
        ></AppQuiz>
      </div>
    </div>

    <div v-if="isOwnerQuizVisible">
      {{ ownerQuiz }}
      <AppQuiz
        v-if="questionsAvailability"
        :question="ownerQuiz[currentIndex][0].question"
        :correct="ownerQuiz[currentIndex][0].correct"
        :incorrect="ownerQuiz[currentIndex][0].incorrect"
        @incrementIndex="nextOwnerQuestion"
      ></AppQuiz>
      {{ ownerQuiz.length == [] ? "There is no user question" : null }}
      <button @click="goBack">Back</button>
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
      isPlayerListVisible: false,
      isQuizFormVisible: false,
      questionsAvailability: false,
      triviaCategories: [],
      selectedCategory: "",
      questionAmount: 1,
      selectedDifficulty: "",
      trivia: [],
      ownerQuiz: [],
      countryFlags: [],
      flagQuiz: {
        correctFlag: {},
        incorrectFlags: []
      },
      players: this.$store.getters.players,
      selectedPlayer: "",
      currentIndex: 0
    };
  },
  components: {
    AppQuiz,
    CountryQuiz
  },
  methods: {
    updatePresentPlayer(player) {
      this.$store.commit("selectPlayer", player);
      console.log(player);
    },
    next() {
      this.generateRandomFlagQuiz(this.countryFlags);
    },
    nextQuestion() {
      if (this.currentIndex < this.questionAmount - 1) this.currentIndex++;
      else {
        console.log("This is end :)");
        this.isQuizVisible = false;
        this.isQuizFormVisible = true;
        this.questionAmount = 1;
      }
    },
    nextOwnerQuestion() {
      if (this.currentIndex < this.ownerQuiz.length - 1) this.currentIndex++;
      else {
        console.log("This is end :)");
        this.isOwnerQuizVisible = false;
        this.questionsAvailability = false;
        this.isMenuVisible = true;
      }
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
          countryFlags[this.generateRandomNumber(countryFlags.length - 1)].name
        ]
      };
    },
    displayTrivia() {
      this.$http
        .get("https://opentdb.com/api_category.php")
        .then(response => {
          return response.json();
        })
        .then(data => {
          const categories = [];
          for (let key in data) {
            categories.push(data[key]);
          }
          console.log(categories);
          this.triviaCategories = categories;
          this.isTriviaQuizVisible = true;
          this.isMenuVisible = false;
          this.isQuizFormVisible = true;
        });
    },
    displayFlagQuiz() {
      this.$http
        .get("https://restcountries.eu/rest/v2/all?fields=name;flag")
        .then(response => {
          return response.json();
        })
        .then(data => {
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
      if (this.ownerQuiz.length > 0) {
        this.questionsAvailability = true;
      }
      this.isOwnerQuizVisible = true;
      this.isMenuVisible = false;
      this.currentIndex = 0;
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
        .then(response => {
          return response.json();
        })
        .then(data => {
          const questions = [];
          for (let key in data) {
            questions.push(data[key]);
          }
          console.log(questions);
          this.trivia = questions;
          this.isQuizVisible = true;
          this.isQuizFormVisible = false;
          this.currentIndex = 0;
        });
    }
  }
};
</script>
<style scoped></style>
