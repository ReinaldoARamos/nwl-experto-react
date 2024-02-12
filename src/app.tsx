import Logo from "./components/Logo";
import { NoteCard } from "./components/note-card";

export default function App() {
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
        <div className="relative space-y-3 overflow-hidden rounded-md bg-slate-700 p-5">
          <span className="text-sm font-medium text-slate-200">
            Adicionar nota
          </span>
          <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em áudio que será convertida para texto
            automaticamente{" "}
          </p>
        </div>
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
    </div>
  );
}
