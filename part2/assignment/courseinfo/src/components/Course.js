import React from "react";

function Course({ course }) {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

function Header({ text }) {
  return <h1>{text}</h1>;
}

function Content({ parts }) {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
}

function Part({ part }) {
  return (
    <p>
      <b>{part.name}</b>: {part.exercises}
    </p>
  );
}

function Total({ parts }) {
  return (
    <p>
      <b>Number of exercises: </b>
      {parts.reduce((sum, part) => {return part.exercises + sum;}, 0)}
    </p>
  );
}

export default Course;
