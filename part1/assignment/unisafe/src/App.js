import React, {useState} from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  function goodButtonHandler() {
    setGood(good + 1);
  }

  function neutralButtonHandler() {
    setNeutral(neutral + 1);
  }

  function badButtonHandler() {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header text="Give Feedback" />
      <Button text="Good" clickHandlerFunction={goodButtonHandler} />
      <Button text="Neutral" clickHandlerFunction={neutralButtonHandler} />
      <Button text="Bad" clickHandlerFunction={badButtonHandler} />
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

function Header({text}) {
  return (
    <h1>{text}</h1>
  );
}

function Button({text, clickHandlerFunction}) {
  return (
    <button onClick={clickHandlerFunction}>
      {text}
    </button>
  );
}

function Statistics({good, neutral, bad}) {
  const totalFeedback = good + neutral + bad;

  if(totalFeedback === 0){
    return (
      <p>No feedback given.</p>
    );
  }

  return (
    <table>
      <tbody>
        <StatisticTableRow text="Good" value={good} />
        <StatisticTableRow text="Neutral" value={neutral} />
        <StatisticTableRow text="Bad" value={bad} />
        <StatisticTableRow text="Average" value={(good - bad) / totalFeedback} />
        <StatisticTableRow text="Positive" value={(good / totalFeedback * 100).toString() + " %"} />
      </tbody>
    </table>
  );
}

function StatisticTableRow({text, value}) {
  return (
    <tr>
      <td><b>{text}</b></td>
      <td>{value}</td>
    </tr>
  );
}

export default App;
