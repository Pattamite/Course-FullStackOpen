import React, { useState, useEffect } from "react";
import PhonebookDb from "./services/PhonebookDb";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    console.log('Start fetching data from database.');
    PhonebookDb
      .getAll()
      .then( (initialPersons) => {
        console.log('Data received.');
        setPersons(initialPersons);
      });
  }, []);

  function newNameInputOnChangeHanlder(event) {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  function newNumberInputOnChangeHanlder(event) {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  function nameFilterInputOnChangeHanlder(event) {
    console.log(event.target.value);
    setNameFilter(event.target.value);
  }

  function addNewNameHandler(event) {
    event.preventDefault();

    const person = persons.find((person) => {return person.name === newName;});
    if (person) {
      const result = window.confirm(`${person.name} is already added to the phonebook, update the number?`);
      if(result) {
        editNumberOfPerson(person);
      }
      return;
    }

    addNewName();
  }

  function addNewName() {
    const newPersonRecord = {
      name: newName,
      number: newNumber,
    };

    PhonebookDb
      .create(newPersonRecord)
      .then( (returnedPerson) => {
        console.log('Add new entry successful.');
        setPersons(persons.concat(returnedPerson));
      });
  }

  function editNumberOfPerson(person) {
    const newPersonRecord = {
      ...person,
      number: newNumber,
    };

    PhonebookDb
      .update(newPersonRecord.id, newPersonRecord)
      .then( (returnedPerson) => {
        console.log('Update entry successful.');
        setPersons(persons.map((person) => {return person.id === returnedPerson.id
          ? returnedPerson
          : person;
        }));
      });
  }

  function removeNameById(id) {
    const person = persons.find((person) => {return person.id === id} );

    const result = window.confirm(`Delete ${person.name}?`);

    if(!result){
      return;
    }

    PhonebookDb
      .remove(id)
      .then( (returnedMessage) => {
        console.log('Remove entry successful.');
        setPersons(persons.filter((person) => {return person.id !== id}));
      });
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
        onChange={nameFilterInputOnChangeHanlder}
      />
      <h2>Add new Entry</h2>
      <form onSubmit={addNewNameHandler}>
        <Input
          text="name:"
          value={newName}
          onChange={newNameInputOnChangeHanlder}
        />
        <Input
          text="number:"
          value={newNumber}
          onChange={newNumberInputOnChangeHanlder}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterPersons.map((person) => {
        return <PersonDisplay 
          key={person.name} 
          person={person} 
          deleteCallBackFunction={removeNameById.bind(null, person.id)}
          />;
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

function PersonDisplay({person, deleteCallBackFunction}) {
  return (
    <>
    <p key={person.name}>
      {person.name} {person.number}
    </p>
    <button onClick={deleteCallBackFunction}>remove</button>
    </>
  );
}

export default App;
