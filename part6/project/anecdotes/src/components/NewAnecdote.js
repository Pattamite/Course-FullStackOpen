import React from "react";
import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, 
  notificationTypeConfirm } from "../reducers/notificationReducer";

function NewAnecdote() {
  const dispatch = useDispatch();

  async function addNewAnecdote(event) {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createNewAnecdote(content));
    dispatch(setNotification('New anecdote created', notificationTypeConfirm));
  }

  return (
    <form onSubmit={addNewAnecdote}>
      <input name='anecdote' />
      <button type='submit'>add</button>
    </form>
  );
}

export default NewAnecdote;