import React from 'react'

function Course({course}){
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

function Header({text}){
  return (
    <h1>{text}</h1>
  );
}

function Content({parts}){
  const elements = [];
  parts.forEach(element => {
    console.log(element);
    elements.push(<Part part={element} />);
  });

  return (
    <>{elements}</>
  );
}

function Part({part}){
  return (
    <p><b>{part.name}</b>: {part.exercises}</p>
  )
}

function Total({parts}){
  let totalExerciseCount = 0;

  parts.forEach(element => {
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
