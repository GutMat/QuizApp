<template>
  <div>
    <div v-if="isMenuVisible">
      <button @click="displayTrivia">Trivia</button>
      <button @click="displayFlagQuiz">Country-Flag Quiz</button>
    </div>
    <div v-if="isCountryQuizVisible">
      <h3>Country-Flag Quiz</h3>
      <button @click="goBack">Back</button>
    </div>
    <div v-if="isTriviaQuizVisible">
      <h3>Trivia</h3>
      <h4>Choose category</h4>
      <div>
        <select v-model="selectedCategory">
          <option
            v-for="(category, index) in triviaCategories[0]"
            :value="category.name"
            :key="index"
            >{{ category.name }}</option
          >
        </select>
        <p>{{ selectedCategory }}</p>
      </div>
      <button @click="goBack">Back</button>
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
      triviaCategories: [],
      selectedCategory: "",
    };
  },
  methods: {
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
          this.triviaCategories = categories;
        });
      this.isTriviaQuizVisible = true;
      this.isMenuVisible = false;
    },
    displayFlagQuiz() {
      this.isCountryQuizVisible = true;
      this.isMenuVisible = false;
    },
    goBack() {
      this.isTriviaQuizVisible = false;
      this.isCountryQuizVisible = false;
      this.isMenuVisible = true;
      this.selectedCategory = "";
    },
  },
};
</script>
<style scoped></style>
