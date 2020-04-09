import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    trivias: []
  },
  mutations: {
    'SET_TRIVIAS'(state, trivias) {
      state.trivias = trivias;
    }
  },
  actions: {
    loadData: ({ commit }) => {
      Vue.http.get('https://opentdb.com/api.php?amount=10&type=multiple')
        .then(response => response.json())
        .then(data => {
          if (data) {
            const trivias = data
            commit('SET_TRIVIAS', trivias);
          }
        });
    }
  },
  getters: {
    trivias: state => {
      return state.trivias;
    }
  },
  modules: {}
});
