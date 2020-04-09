import Vue from "vue";
import VueRouter from "vue-router";

import Home from '../components/Home.vue';
import Players from '../components/Players.vue';
import QuestionCreator from '../components/QuestionCreator.vue';
import QuizMenu from '../components/QuizMenu.vue';
import Stats from '../components/Stats.vue';

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
    component: QuizMenu
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
  },
];

const router = new VueRouter({
  routes
});

export default router;
