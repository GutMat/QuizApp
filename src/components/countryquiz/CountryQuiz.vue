<template>
  <div class="card text-center" style="width: 28rem;">
    <div class="card-header">
      <h4>To what country this flag belongs?</h4>
    </div>
    <img :src="flagQuiz.correctFlag.flag" alt="flag" class="card-img-top" />
    <div class="card-body">
      <button
        v-for="(answer, index) in answers"
        :key="index"
        :ref="answer"
        class="btn btn-secondary col-12"
        style="margin: 5px 0px"
        @click="selectedAnswer(answer)"
      >
        {{ answer }}
      </button>
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
    next: Function,
  },
  computed: {
    answers() {
      let answers = this.flagQuiz.incorrectFlags.concat(
        this.flagQuiz.correctFlag.name
      );
      answers = this.shuffle(answers);
      return answers;
    },
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
        this.$refs[value][0].className = "btn btn-success col-12";

        setTimeout(() => {
          this.$refs[value][0].className = "btn btn-secondary col-12";

          return this.$emit("next");
        }, 500);

        this.incrementScore();
      } else {
        this.$refs[value][0].className = "btn btn-danger col-12";

        let player = this.$store.getters.presentPlayer;
        this.$store.commit("changeClicks", player);
        setTimeout(() => {
          this.$refs[value][0].className = "btn btn-secondary col-12";

          return this.$emit("next");
        }, 500);
      }
    },
  },
};
</script>
