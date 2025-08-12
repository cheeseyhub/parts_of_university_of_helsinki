const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GOOD":
      const newGood = {
        ...state,
        good: state.good + 1,
      };
      return newGood;
    case "OK":
      const newOk = {
        ...state,
        ok: state.ok + 1,
      };

      return newOk;
    case "BAD":
      const newBad = {
        ...state,
        bad: state.bad + 1,
      };
      return newBad;
    case "ZERO":
      const stateReset = {
        good: 0,
        ok: 0,
        bad: 0,
      };
      return stateReset;
    default:
      return state;
  }
};

export default counterReducer;
