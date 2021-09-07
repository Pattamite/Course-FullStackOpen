import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('A new note...');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then( (response) => {
        console.log('promise fulfilled');
        setNotes(response.data);
      });
  }, []);

  console.log('render', notes.length, 'notes')

  function addNote(event) {
    event.preventDefault();
    const newNoteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setNotes(notes.concat(newNoteObject));
    console.log('button clicked', event.target);
  }

  function handleNewNoteChange(event) {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  function handleShowAllButton() {
    setShowAll(!showAll);
  }
  
  const notesToShow = showAll
    ? notes
    : notes.filter( (note) => {return note.important;} );

  //  Each child in a LIST (not <ul>) should have a unique "key" prop.
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={handleShowAllButton}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map( (note) => 
        <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNewNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App