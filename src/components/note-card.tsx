interface NoteCard {
note : {
  text: string,
  date: Date,
}

}
export function NoteCard({note} : NoteCard) {
  return (
    <button className="relative gap-3 overflow-hidden flex flex-col rounded-md bg-slate-800 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-300">{note.date.toISOString()}</span>

      <p className="text-sm leading-6 text-slate-400">
       {note.text}
      </p>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
    </button>
  );
}
