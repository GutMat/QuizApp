<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title text-center">{{question}}</h3>
    </div>
    <div class="panel-body">
      <div
        class="col-xs-12 col-sm-6 text-center answer"
        v-for="(answer, index) in answers"
        :key="index"
      >
        <button class="btn btn-primary btn-lg" style="margin: 10px">{{answer}}</button>
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
    correct: String,
    incorrect: Array,
    question: String
  },
  computed: {
      answers(){
        let answers = this.incorrect.concat(this.correct)
        for(let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = answers[i]
            answers[i] = answers[j]
            answers[j] = temp
        }
        return answers
      }
  },
};
</script>