const actionTypeSet = 'FILTER_SET';

function filterReducer(state = '', action) {
  switch(action.type) {
    case actionTypeSet:
      console.log(action.data.filter)
      return action.data.filter;
    default:
      return state;
  }
}


export function setFilter(filter) {
  return {
    type: actionTypeSet,
    data : {
      filter: filter,
    },
  };
}

export default filterReducer;

