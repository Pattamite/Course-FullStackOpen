import anecdotesService from '../services/anecdotes';

const actionTypeUpdate = 'ANECDITE_UPDATE';
const actionTypeCreate = 'ANECDITE_CREATE';
const actionTypeInit = 'ANECDITE_INIT';

function anecdoteReducer(state = [], action) {
  switch(action.type) {
    case actionTypeUpdate:
      return updateAnecdoteById(state, action.data.id, action.data.anecdote);
    case actionTypeCreate:
      return state.concat(action.data);
      case actionTypeInit:
      return action.data;
    default:
      return state;
  }
}

function updateAnecdoteById(state, id, newAnecdote) {
  return state.map( (anecdote) => {
    return anecdote.id === id
      ? newAnecdote
      : anecdote;
  });
}

export function voteAnecdote(id) {
  return async (dispatch) => {
    const anecdote = await anecdotesService.getById(id);
    const updatedAnecdote = {
      ...anecdote,
      vote: anecdote.vote + 1,
    }
    const newAnecdote = await anecdotesService.update(id, updatedAnecdote);
    dispatch({
      type: actionTypeUpdate,
      data : {
        id: id,
        anecdote: newAnecdote,
      },
    });
  };
}

export function createNewAnecdote(text) {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(text);
    dispatch({
      type: actionTypeCreate,
      data : newAnecdote,
    });
  };
}

export function initializeAnecdotes() {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: actionTypeInit,
      data: anecdotes,
    });
  };
}

export default anecdoteReducer;

