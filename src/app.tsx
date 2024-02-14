import Logo from "./components/Logo";
import { NewNote } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export default function App() {

  const note = {
    text: "hello world",
    date: new Date()
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
        <NewNote />
        <NoteCard note={note} />
        <NoteCard note={note} />
        <NoteCard note={note} />  
      </div>
    </div>
  );
}
