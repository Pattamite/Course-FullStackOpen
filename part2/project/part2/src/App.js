import React, {useState} from 'react'
import Note from './components/Note'

function App({notes}) {
  const [currentNotes, setNotes] = useState(notes);
  const [newNote, setNewNote] = useState('A new note...');
  const [showAll, setShowAll] = useState(true);

  function addNote(event) {
    event.preventDefault();
    const newNoteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: currentNotes.length + 1,
    };
    setNotes(currentNotes.concat(newNoteObject));
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
    ? currentNotes
    : currentNotes.filter( (note) => {return note.important;} );

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