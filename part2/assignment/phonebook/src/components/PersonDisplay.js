import React from 'react'

function PersonDisplay({person, deleteCallBackFunction}) {
  return (
    <>
    <p key={person.name}>
      {person.name} {person.number}
    </p>
    <button onClick={deleteCallBackFunction}>remove</button>
    </>
  );
}

export default PersonDisplay