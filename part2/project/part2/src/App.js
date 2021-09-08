import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('A new note...');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then( (initialNotes) => {
        setNotes(initialNotes);
      });
  }, []);

  console.log('render', notes.length, 'notes')

  function addNote(event) {
    event.preventDefault();
    const newNoteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    noteService
      .create(newNoteObject)
      .then((returnedNotes) => {
        setNotes(notes.concat(returnedNotes));
        setNewNote('');
      });
  }

  function handleNewNoteChange(event) {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  function handleShowAllButton() {
    setShowAll(!showAll);
  }

  function toggleImportance(id) {
    //  Reference to note in array
    const note = notes.find((note) => {return note.id === id});
    //  Create new note to avoid mutating note in array
    const changedNote = {...note, important: !note.important};

    noteService
      .update(id, changedNote)
      .then((returnedNotes) => {
        setNotes(
          notes.map((note) => {
            return note.id === id 
              ? returnedNotes
              : note;
          })
        )
      })
      .catch((error) => {
        alert(`The note was already deleted from server`);
        setNotes(notes.filter((note) => {return note.id !== id}));
      });
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
        <Note 
          key={note.id}
          note={note}
          toggleImportance={toggleImportance.bind(null, note.id)}
        />
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