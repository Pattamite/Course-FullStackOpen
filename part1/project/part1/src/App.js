import React, { useState } from 'react'

function App() {
  const [timeCounter, setTimeCounter] = useState(0);

  setTimeout(
    () => setTimeCounter(timeCounter + 1),
    1000
  )

  const [clickCounter, setClickCounter] = useState(0);

  function changeClickCounterValue(value) {
    setClickCounter(clickCounter + value);
  }

  function resetClickCounterValue() {
    setClickCounter(0);
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
    </div>
  );
}

// React component names must be capitalized!
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

export default App;
