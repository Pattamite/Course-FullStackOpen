import React, { useState } from 'react'

function App() {
  const anecdoteArr = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
   
  const [selected, setSelected] = useState(0);
  const [voteArr, setVoteArr] = useState(new Array(anecdoteArr.length).fill(0));
  const [mostVoteIndex, setMostVoteIndex] = useState(0);

  console.log(voteArr);

  function randomButtonHandler() {
    setSelected( Math.floor(Math.random() * anecdoteArr.length) );
  }

  function voteButtonHandler() {
    let newVoteArr = [...voteArr];
    newVoteArr[selected] += 1;
    setVoteArr(newVoteArr);
    setMostVoteIndex(findMostVoteIndex(newVoteArr));
  }

  function findMostVoteIndex(newVoteArr) {
    let mostVoteValue = 0;
    let mostVoteIndex = 0;
    for(let i = 0; i < newVoteArr.length; i++)
    {
      if(newVoteArr[i] > mostVoteValue)
      {
        mostVoteValue = newVoteArr[i];
        mostVoteIndex = i;
      }
    }

    return mostVoteIndex;
  }

  return (
    <div>
      <h1>Anecdote of the daty</h1>
      <p>{anecdoteArr[selected]}</p>
      <p>has {voteArr[selected]} vote(s).</p>
      <Button text="Random" clickHandlerFunction={randomButtonHandler} />
      <Button text="Vote" clickHandlerFunction={voteButtonHandler} />
      <h1>Anecdote with most votes</h1>
      <p>{anecdoteArr[mostVoteIndex]}</p>
      <p>has {voteArr[mostVoteIndex]} vote(s).</p>
    </div>
  );
}

function Button({text, clickHandlerFunction}){
  return (
    <button onClick={clickHandlerFunction}>
      {text}
    </button>
  );
}

export default App