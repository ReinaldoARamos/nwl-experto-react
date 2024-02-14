import { useState } from "react";
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
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6">
      <Logo />
      <form action="" className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 focus:outline-none"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] grid-cols-3 gap-6">
        <NewNote onNoteCreated={onNoteCreated} />
        {notes.map((notes) => {
          return <NoteCard note={notes} key={notes.id} />;
        })}
      </div>
    </div>
  );
}
