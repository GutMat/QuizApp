export const addPlayer = (state, payload) => {
  state.players.push(payload);
};
export const incrementScore = (state, payload) => {
  state.players[payload.name] += payload.score;
};
