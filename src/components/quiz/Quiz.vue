<template>
  <div class="card">
    <h3 class="card-title text-center">{{ questionDecoded }}</h3>
    <div class="card-body text-center">
      <div class="container-fluid">
        <div class="col">
          <button
            v-for="(answer, index) in answers"
            :key="index"
            :ref="answer"
            class="btn btn-primary col-md-4"
            style="margin: 10px"
            @click="selectedAnswer(answer)"
          >{{ answer }}</button>
        </div>
      </div>
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
    question: String
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
    }
  },
  methods: {
    incrementScore() {
      let player = this.$store.getters.presentPlayer;
      this.$store.commit("changeScore", player);
      this.$store.commit("changeClicks", player);
    },
    selectedAnswer(value) {
      if (value == this.correct) {
        this.incrementScore();
        alert("Good answer :)");
        this.$refs[value][0].className = "btn btn-success col-md-4";
        setTimeout(() => {
          this.$refs[value][0].className = "btn btn-primary col-md-4";
          return this.$emit("incrementIndex");
        }, 500);
      } else {
        alert("Bad answer :(");
        this.$refs[value][0].className = "btn btn-danger col-md-4";
        let player = this.$store.getters.presentPlayer;
        this.$store.commit("changeClicks", player);
        setTimeout(() => {
          this.$refs[value][0].className = "btn btn-primary col-md-4";
          this.$emit("incrementIndex");
        }, 500);
      }
    }
  }
};
</script>
