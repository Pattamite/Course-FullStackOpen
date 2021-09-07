import React, { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

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
