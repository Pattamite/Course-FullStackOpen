import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification,
  notificationTypeConfirm } from "../reducers/notificationReducer";

function Anecdote({anecdote, handleVote}) {
  return (
    <div>
      <h3>{anecdote.text}</h3>
      <p>has {anecdote.vote} vote(s). <button onClick={handleVote}>vote</button></p>
      
    </div>
  );
}

function Anecdotes() {
  const dispatch = useDispatch();
  
  const filter = useSelector((state) => {return state.filter;});
  const anecdotes = useSelector((state) => {return state.anecdote;});
  const filteredAnecdotes = anecdotes.filter((anecdote) => {return anecdote.text.includes(filter);});
  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => {return b.vote - a.vote;});

  function handleVote(anecdote){
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`Voted ${anecdote.text}`, notificationTypeConfirm));
  }

  return(
    <div>
      {sortedAnecdotes.map((anecdote) => { return (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={handleVote.bind(null, anecdote)}
          />
      );})}
    </div>
  )
}

export default Anecdotes;