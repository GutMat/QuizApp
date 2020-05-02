export const addPlayer = (state, payload) => {
  state.players.push(payload);
};

export const selectPlayer = (state, payload) => {
  state.selectedPlayer = payload
};

export const removePlayer = (state, payload) => {
  state.players.splice(payload, 1)
}

export const changeScore = (state, payload) => {
  payload.score++;
};

export const changeClicks = (state, payload) => {
  payload.clicks++;
};

export const addQuestion = (state, payload) => {
  state.quiz.push(payload);
}

export const removeQuestion = (state, payload) => {
  state.quiz.splice(payload, 1)
}