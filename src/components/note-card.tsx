import * as Dialog from "@radix-ui/react-dialog";
interface NoteCard {
  note: {
    text: string;
    date: Date;
  };
}
export function NoteCard({ note }: NoteCard) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative flex flex-col gap-3 overflow-hidden rounded-md bg-slate-800 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {note.date.toISOString()}
        </span>

        <p className="text-sm leading-6 text-slate-400">{note.text}</p>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50 "/>
        <Dialog.Content className="z-10 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full outline ">oi</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
