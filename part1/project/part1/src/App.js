import React from 'react'

// React component names must be capitalized!
function Hello(props) {
  
  return (
    <p>Hello world {props.name} {props.number}</p>
  )
}

function App() {
  const a = 10;
  const b = 20;

  return (
    // can use <>
    <div> 
      <Hello name="Pattamite" number={a + b}/>
      <p>{a} plus {b} is {a + b}</p>
    </div> // can use </>
  );
}

export default App;
