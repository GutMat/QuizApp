<template>
  <div class="card text-center">
    <div class="card-header">
      <h4>{{ questionDecoded }}</h4>
    </div>
    <div class="card-body">
      <button
        v-for="(answer, index) in answers"
        :key="index"
        :ref="answer"
        class="btn btn-secondary col-md-5"
        style="margin: 10px; paddng: 5px"
        @click="selectedAnswer(answer)"
      >
        {{ answer | removeEntity }}
      </button>
    </div>
  </div>
</template>
<script>
function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
export default {
  data() {
    return {};
  },
  props: {
    correct: String,
    incorrect: Array,
    question: String,
  },
  filters: {
    removeEntity(value) {
      var txt = document.createElement("textarea");
      txt.innerHTML = value;
      return txt.value;
    },
  },
  computed: {
    answers() {
      let answers = this.incorrect.concat(this.correct);
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = answers[i];
        answers[i] = answers[j];
        answers[j] = temp;
      }
      return answers;
    },
    questionDecoded() {
      return decodeHtml(this.question);
    },
  },
  methods: {
    incrementScore() {
      let player = this.$store.getters.presentPlayer;
      this.$store.commit("changeScore", player);
      this.$store.commit("changeClicks", player);
    },
    selectedAnswer(value) {
      let updatedCorrect = decodeHtml(this.correct);
      if (value == updatedCorrect) {
        this.incrementScore();
        this.$refs[value][0].className = "btn btn-success col-md-5";
        setTimeout(() => {
          this.$refs[value][0].className = "btn btn-secondary col-md-5";
          return this.$emit("incrementIndex");
        }, 500);
      } else {
        this.$refs[value][0].className = "btn btn-danger col-md-5";
        let player = this.$store.getters.presentPlayer;
        this.$store.commit("changeClicks", player);
        setTimeout(() => {
          this.$refs[value][0].className = "btn btn-secondary col-md-5";
          this.$emit("incrementIndex");
        }, 500);
      }
    },
  },
};
</script>
