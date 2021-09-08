import React, { useState, useEffect } from "react";
import axios from 'axios'

const countryDisplayLimit = 10

function App() {
  const [searchName, setSearchName] = useState("");
  const [countryDataArr, setCountryDataArr] = useState([]);

  function searchNameOnChangeHandler(event) {
    console.log(event.target.value);
    setSearchName(event.target.value); 
  }

  useEffect(() => {
    console.log('Start fetching data from database.');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( (response) => {
        console.log('Data received.');
        setCountryDataArr(response.data);
      });
  }, []);

  const filterCounterDataArr = countryDataArr.filter((country) => {
    return country.name.toUpperCase().includes(searchName.toUpperCase());
  });

  console.log(filterCounterDataArr);

  return (
    <div>
      <Input
        text="find countries:"
        value={searchName}
        onChange={searchNameOnChangeHandler}
      />
      <h1>Search Result</h1>
      <CountrySearchResult countryArr={filterCounterDataArr} />
    </div>
  );
}

function Input({ text, value, onChange }) {
  return (
    <div>
      {text}
      <input value={value} onChange={onChange} />
    </div>
  );
}

function CountrySearchResult({countryArr}) {
  if(countryArr.length === 0){
    return (<p>No country found.</p>);
  }
  else if(countryArr.length === 1){
    return (
      <div>
        <CountryDisplay country={countryArr[0]} />
      </div>
    );
  }
  else if(countryArr.length > countryDisplayLimit){
    return (<p>Too many matches, specify another filter.</p>);
  }
  else {
    return (
      <ul>
        {countryArr.map((country) => {
          return (
          <li key={country.name}>
            <CountryListItemDisplay  country={country} />
          </li>
          );
        })}
      </ul>
    );
  }
}

function CountryDisplay({country}) {
  return(
    <>
    <h2>{country.name}</h2>
    <p><b>Capital: </b>{country.capital}</p>
    <p><b>Population: </b>{country.population}</p>
    <h3>Languages</h3>
    <ul>
      {country.languages.map((language) => {
        return (<li key={language.iso639_2}>{language.name}</li>);
      })}
    </ul>
    <img src={country.flag} alt={country.name} height="150"></img>
    </>
  );
}

function CountryListItemDisplay({country}) {
  const elementId = country.alpha3Code;

  return (
    <>
      {country.name}
      <button onClick={ToggleCountrylistDisplay.bind(null, elementId)}>
          Toggle Show
      </button>
      <div id={elementId} style={{display:'none'}}>
        <CountryDisplay country={country} />
      </div>
    </>
  );
}

function ToggleCountrylistDisplay(id) {
  let countryElement = document.getElementById(id);

  if(!countryElement) {
    console.log(`Can't find country element with id = "${id}"`);
    return;
  }

  if(countryElement.style.display === "none") {
    countryElement.style.display = "block";
  } else {
    countryElement.style.display = "none";
  }
}


export default App;
