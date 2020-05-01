<template>
  <div class="card">
    <h3 class="card-title text-center">To what country this flag belongs?</h3>

    <div class="card-body text-center">
      <img
        :src="flagQuiz.correctFlag.flag"
        alt="flag"
        style="width: 100px; height: 100px; margin-bottom: 25px;"
      />

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
export default {
  data() {
    return {};
  },
  props: {
    flagQuiz: Object,
    next: Function
  },
  computed: {
    answers() {
      let answers = this.flagQuiz.incorrectFlags.concat(
        this.flagQuiz.correctFlag.name
      );
      answers = this.shuffle(answers);
      return answers;
    }
  },
  methods: {
    incrementScore() {
      let player = this.$store.getters.presentPlayer;
      this.$store.commit("changeScore", player);
      this.$store.commit("changeClicks", player);
    },
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    selectedAnswer(value) {
      if (value == this.flagQuiz.correctFlag.name) {
        alert("Good answer :)");
        this.$refs[value][0].className = "btn btn-success col-md-4";

        setTimeout(() => {
          this.$refs[value][0].className = "btn btn-primary col-md-4";

          return this.$emit("next");
        }, 500);

        this.incrementScore();
      } else {
        alert("Bad answer :(");
        this.$refs[value][0].className = "btn btn-danger col-md-4";

        let player = this.$store.getters.presentPlayer;
        this.$store.commit("changeClicks", player);
        setTimeout(() => {
          this.$refs[value][0].className = "btn btn-primary col-md-4";

          return this.$emit("next");
        }, 500);
      }
    }
  }
};
</script>
