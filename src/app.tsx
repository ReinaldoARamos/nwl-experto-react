import { ChangeEvent, useState } from "react";
import Logo from "./components/Logo";
import { NewNote } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Notes {
  content: string;
  date: Date;
  id: string;
}
export default function App() {
  const [notes, setNotes] = useState<Notes[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });
  const [search, setSearch] = useState('')

  function onNoteCreated(content: string) {
    const newNote = {
      content,
      date: new Date(),
      id: crypto.randomUUID(),
    };

    const notesArray = [newNote, ...notes];
    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }
  function handleSearch(event : ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }
 function onNoteDeleted(id:string) {
  const notesArray = notes.filter(note => {
    return note.id === id;
  })

  setNotes(notesArray)
  localStorage.setItem('notes', JSON.stringify(notesArray))
 }
 
  const filteredNotes = search != '' ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  : notes
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6 px-5 md:px-0" >
      <Logo />
      <form action="" className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 focus:outline-none"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-col-1 auto-rows-[250px] md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewNote onNoteCreated={onNoteCreated} />
        {filteredNotes.map((notes) => {
          return <NoteCard note={notes} key={notes.id} onNoteDeleted={onNoteDeleted}/>;
        })}
      </div>
    </div>
  );
}
