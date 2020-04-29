import Vue from "vue";
import Vuex from "vuex";
import * as mutations from "./mutations";
import * as actions from "./actions";
Vue.use(Vuex);
import Player from "../components/model/Player";
const defaultPlayer = new Player("default");
export default new Vuex.Store({
  state: {
    players: [defaultPlayer],
    quiz: [],
    selectedPlayer: defaultPlayer
  },
  mutations,
  actions,
  getters: {
    players: state => {
      return state.players;
    },
    quiz: state => {
      return state.quiz;
    },
    presentPlayer: state => {
      return state.selectedPlayer;
    }
  },
});
