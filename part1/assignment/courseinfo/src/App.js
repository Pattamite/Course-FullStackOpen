import React from 'react'

function Header(props){
  return (
    <h1>{props.text}</h1>
  );
}

function Content(props){
  return (
    <p><b>{props.text}</b>: {props.exerciseCount}</p>
  );
}

function Total(props){
  return (
    <p><b>{props.text}</b>: {props.exerciseCount}</p>
  );
}

function App() {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to  pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header text={course}/>
      <Content text={part1} exerciseCount={exercises1}/>
      <Content text={part2} exerciseCount={exercises2}/>
      <Content text={part3} exerciseCount={exercises3}/>
      <Total text="Number of exercises:" exerciseCount={exercises1 + exercises2 + exercises3}/>
    </div>
  );
}

export default App;
