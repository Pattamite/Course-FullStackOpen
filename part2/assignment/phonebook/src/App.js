import React, { useState, useEffect } from "react";
import Input from "./components/Input"
import Notification from "./components/Notification"
import PersonDisplay from "./components/PersonDisplay"
import PhonebookDb from "./services/PhonebookDb";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState('');

  const notificationErrorClass = "error";
  const notificationConfirmClass = "confirm";

  useEffect(() => {
    console.log('Start fetching data from database.');
    PhonebookDb
      .getAll()
      .then( (initialPersons) => {
        console.log('Data received.');
        setPersons(initialPersons);
      });
  }, []);

  function setNotification(message, messageClass = notificationConfirmClass, timeout = 5000) {
    setNotificationMessage(message);
    setNotificationClass(messageClass);

    if(timeout > 0) {
      setTimeout(() => {
        setNotificationMessage(null);
      }, timeout);
    }
  }

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
        setPersons(persons.concat(returnedPerson));
        console.log('Add new entry successful.');
        setNotification('Add new entry successful.', notificationConfirmClass);
      })
      .catch( (error) => {
        console.log('Failed to add new entry.', error);
        setNotification('Failed to add new entry.', notificationErrorClass);
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
        setPersons(persons.map((person) => {
          console.log('Update entry successful.');
          setNotification('Update entry successful.', notificationConfirmClass);
          return person.id === returnedPerson.id
          ? returnedPerson
          : person;
        }));
      })
      .catch( (error) => {
        console.log('Failed to update entry.', error);
        setNotification('Failed to update entry.', notificationErrorClass);
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
        setPersons(persons.filter((person) => {return person.id !== id}));
        console.log('Remove entry successful.');
        setNotification('Remove entry successful.', notificationConfirmClass);
      })
      .catch( (error) => {
        console.log('Failed to remove entry.', error);
        setNotification('Failed to remove entry.', notificationErrorClass);
      });
  }

  const filterPersons = persons.filter((person) => {
    return person.name.toUpperCase().startsWith(nameFilter.toUpperCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={notificationMessage}
        notificationClass={notificationClass}
      />
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





export default App;
