const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const actionGood = 'GOOD';
const actionOk = 'OK';
const actionBad = 'BAD';
const actionZero = 'ZERO';

function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case actionGood:
      return {
        ...state,
        good: state.good + 1,
      };
    case actionOk:
      return {
        ...state,
        ok: state.ok + 1,
      };
    case actionBad:
      return {
        ...state,
        bad: state.bad + 1,
      };
    case actionZero:
      return {
        ...state,
        good: 0,
        ok: 0,
        bad: 0,
      };
    default:
      return state;
  }
}

const counterReducer = {
  reducer,
  actionGood,
  actionOk,
  actionBad,
  actionZero
};

export default counterReducer;