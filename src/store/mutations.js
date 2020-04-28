export const addPlayer = (state, payload) => {
  state.players.push(payload);
};

export const addQuestion = (state, payload) => {
  state.quiz.push(payload);
}
// export const incrementScore = (state, payload) => {
//   state.players[players.length - 1].score += payload;
// };
