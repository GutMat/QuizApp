import Vue from "vue";
import Vuex from "vuex";
import * as mutations from "./mutations";
import * as actions from "./actions";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
  },
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
  },
  getters: {
    players: (state) => {
      return state.players;
    },
  },
});
