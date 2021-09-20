import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux';
import counterReducer from './CounterReducer';

const counterStore = createStore(counterReducer.reducer);

function App() {

  function goodButtonHandler() {
    counterStore.dispatch({ type: counterReducer.actionGood });
  }

  function neutralButtonHandler() {
    counterStore.dispatch({ type: counterReducer.actionOk });
  }

  function badButtonHandler() {
    counterStore.dispatch({ type: counterReducer.actionBad });
  }

  function resetButtonHandler() {
    counterStore.dispatch({ type: counterReducer.actionZero });
  }

  return (
    <div>
      <Header text="Give Feedback" />
      <Button text="Good" clickHandlerFunction={goodButtonHandler} />
      <Button text="Neutral" clickHandlerFunction={neutralButtonHandler} />
      <Button text="Bad" clickHandlerFunction={badButtonHandler} />
      <Button text="Reset" clickHandlerFunction={resetButtonHandler} />
      <Header text="Statistics" />
      <Statistics 
        good={counterStore.getState().good}
        neutral={counterStore.getState().ok}
        bad={counterStore.getState().bad}
      />
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

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp();
counterStore.subscribe(renderApp);

export default App;
