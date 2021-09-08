import React, { useState, useEffect } from "react";
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    console.log('Start fetching data from database.');
    axios
      .get('http://localhost:3001/persons')
      .then( (response) => {
        console.log('Data received.');
        setPersons(response.data);
      });
  }, []);

  function NewNameInputOnChangeHanlder(event) {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  function NewNumberInputOnChangeHanlder(event) {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  function NameFilterInputOnChangeHanlder(event) {
    console.log(event.target.value);
    setNameFilter(event.target.value);
  }

  function AddNewNameHandler(event) {
    event.preventDefault();

    let isFoundDuplicateName = false;
    persons.forEach((person) => {
      if (person.name === newName) {
        isFoundDuplicateName = true;
      }
    });
    if (isFoundDuplicateName) {
      alert(`${newName} is already added to this phonebook.`);
      return;
    }

    const newPersonRecord = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPersonRecord));
    console.log(persons);
  }

  const filterPersons = persons.filter((person) => {
    return person.name.toUpperCase().startsWith(nameFilter.toUpperCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Input
        text="filter:"
        value={nameFilter}
        onChange={NameFilterInputOnChangeHanlder}
      />
      <h2>Add new Entry</h2>
      <form onSubmit={AddNewNameHandler}>
        <Input
          text="name:"
          value={newName}
          onChange={NewNameInputOnChangeHanlder}
        />
        <Input
          text="number:"
          value={newNumber}
          onChange={NewNumberInputOnChangeHanlder}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterPersons.map((person) => {
        return <PersonLog key={person.name} person={person} />;
      })}
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

function PersonLog({ person }) {
  return (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  );
}

export default App;
