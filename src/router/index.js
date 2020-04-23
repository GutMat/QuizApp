import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/home/Home.vue";
import Players from "../views/players/Players.vue";
import QuestionCreator from "../views/questionCreator/QuestionCreator.vue";
import QuizStorage from "../views/quizStorage/QuizStorage.vue";
import Stats from "../views/stats/Stats.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/quiz-menu",
    name: "QuizMenu",
    component: QuizStorage
  },
  {
    path: "/players",
    name: "Players",
    component: Players
  },
  {
    path: "/stats",
    name: "Stats",
    component: Stats
  },
  {
    path: "/question-creator",
    name: "QuestionCreator",
    component: QuestionCreator
  }
];

const router = new VueRouter({
  routes
});

export default router;
