import React, { useState } from 'react'

function App() {

  //  Simple time counter
  //  The useState function  must not be called from inside of a loop,
  //    a conditional expression, or any place that is not a function defining a component.
  //  Hooks may only be called from the inside of a function body that defines a React component
  const [timeCounter, setTimeCounter] = useState(0);

  setTimeout(
    () => setTimeCounter(timeCounter + 1),
    1000
  )

  // Simple click counter
  const [clickCounter, setClickCounter] = useState(0);

  function changeClickCounterValue(value) {
    setClickCounter(clickCounter + value);
  }

  function resetClickCounterValue() {
    setClickCounter(0);
  }

  // Complex click counter
  const [mouseClickCounter, setMouseClickCounter] = useState({
    left: 0, right: 0
  });

  const [mouseClickLog, setMouseClickLog] = useState([]);

  function handleLeftButtonClick() {
    const newClick = {
      ...mouseClickCounter,
      left: mouseClickCounter.left + 1
    }
    setMouseClickCounter(newClick);
    //  Concat will return a new array instead of mutate the current one.
    //  The state of React components must not be mutated directly.
    setMouseClickLog(mouseClickLog.concat('L'));
  }

  function handleRightButtonClick() {
    const newClick = {
      ...mouseClickCounter,
      right: mouseClickCounter.right + 1
    }
    setMouseClickCounter(newClick);
    setMouseClickLog(mouseClickLog.concat('R'));
  }


  return (
    <div>
        <Display 
          counterName="Time counter" 
          counter={timeCounter} 
        />
        <Display 
          counterName="Click counter"
          counter={clickCounter} 
        />
        <Button 
          buttonName='Increase' 
          onClickFunction={changeClickCounterValue.bind(null, 1)} 
        />
        <Button 
          buttonName='Decrease' 
          onClickFunction={changeClickCounterValue.bind(null, -1)} 
        />
        <Button 
          buttonName='Reset' 
          onClickFunction={resetClickCounterValue} 
        />
        <Display 
          counterName="Left button click counter"
          counter={mouseClickCounter.left} 
        />
        <Display 
          counterName="Right button click counter"
          counter={mouseClickCounter.right} 
        />
        <History
          mouseClickLog={mouseClickLog}
        />
        <Button 
          buttonName='Left' 
          onClickFunction={handleLeftButtonClick} 
        />
        <Button 
          buttonName='Right' 
          onClickFunction={handleRightButtonClick} 
        />
    </div>
  );
}

//  React component names must be capitalized!
//  Do not define components within components
function Display({counterName, counter}) {
  return (
    <p>{counterName}: {counter}</p>
  );
}

function Button({buttonName, onClickFunction}){
  return(
    <button onClick={onClickFunction}>
      {buttonName}
    </button>
  );
}

function History({mouseClickLog}) {
  if(mouseClickLog.length === 0) {
    return (
      <p>No left/right button click log yet.</p>
    )
  }
  return (
    <Display 
      counterName="Button click log"
      counter={mouseClickLog.join(' ')} 
    />
  )
}

export default App;
