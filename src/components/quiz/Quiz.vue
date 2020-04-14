<template>
  <div class="card">
      <h3 class="card-title text-center">{{question}}</h3>
    <div class="card-body">
      <div
        class="col-xs-12 col-sm-6 text-center"
        v-for="(answer, index) in answers"
        :key="index"
      >
        <button class="btn btn-primary btn-lg" style="margin: 10px" @click="selectedAnswer(answer)">{{answer}}</button>
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
  methods: {
    selectedAnswer(value) {
        if(value == this.correct){
          alert("Good answer :)")
        } else {
          alert("Bad answer :(")
        }
    }
  },
};
</script>