import React from 'react'

function Course(props){
  return (
    <>
      <Header text={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  );
}

function Header(props){
  return (
    <h1>{props.text}</h1>
  );
}

function Content(props){
  const elements = [];
  props.parts.forEach(element => {
    console.log(element);
    elements.push(<Part part={element} />);
  });

  return (
    <>{elements}</>
  );
}

function Part(props){
  return (
    <p><b>{props.part.name}</b>: {props.part.exercises}</p>
  )
}

function Total(props){
  let totalExerciseCount = 0;

  props.parts.forEach(element => {
    totalExerciseCount += element.exercises;
  });

  return (
    <p><b>Number of exercises:</b>: {totalExerciseCount}</p>
  );
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  );
}

export default App;
