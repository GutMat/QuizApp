<template>
  <div>
    <button @click="loadData">Load Data</button>
    <button @click="displayData">Display Data</button>
    <div>{{quiz}}</div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
        quiz: []
    };
  },
  methods: {
    ...mapActions({
      fetchData: "loadData"
    }),
    loadData() {
      this.fetchData();
    },
    displayData() {
      const quiz = this.$store.getters.trivias;
      this.quiz = quiz
    }
  }
};
</script>
<style scoped>
</style>