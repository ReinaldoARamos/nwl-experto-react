import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

const speechRecognition : SpeechRecognition | null = null;
export function NewNote({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setshouldShowOnboarding] =
    useState<boolean>(true);
  const [content, setContent] = useState<string>("");
  const [isRecording, setisRecording] = useState<boolean>(false);

  function handleStartEditor() {
    setshouldShowOnboarding(false);
  }

  function handleEditorChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value === "") setshouldShowOnboarding(true);
    setContent(event.target.value);
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    console.log(content);
    onNoteCreated(content);
    toast.success("Nota criada com sucesso");
    setContent("");
    setshouldShowOnboarding(true);
  }

  function handleStartRecording() {
    
    const isSpeechRecognitionAPIavailable =
      "SpeechRegognition" in window || "webkitSpeechRecognition" in window;

   

    if (!isSpeechRecognitionAPIavailable) {
      alert("seu navegador não suporta a API de navegação");
      return;
    }

    setisRecording(true);
    setshouldShowOnboarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

     speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-br'
    speechRecognition.continuous = true //nao vai parar de gravar ate que eu fale manualmente pra parar
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true //quero que a API vá trazendo os resultados conforme o usuário vá falando

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
          return text.concat(result[0].transcript)
      } , '')
        setContent(transcription)
        //faz a transcrição pegando o array e transformando em texto
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }
  function handleStopRecording() {
    setisRecording(false);
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative flex flex-col space-y-3 overflow-hidden rounded-md bg-slate-700 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente{" "}
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 " />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-10 flex h-[60vh] w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-slate-700 outline-none ">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 outline-none transition-colors hover:cursor-pointer hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form onSubmit={handleSaveNote} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartRecording}
                    type="button"
                  >
                    gravando uma nota{" "}
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartEditor}
                    type="button"
                  >
                    utilize apenas texto
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none"
                  onChange={handleEditorChange}
                  value={content}
                ></textarea>
              )}
            </div>
            {isRecording ? (
              <button
                type="button"
                className="group flex w-full items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm font-medium text-slate-300 outline-none transition-colors hover:bg-lime-500"
                onClick={handleStopRecording}
              >
                <div className="size-3 animate-pulse rounded-full bg-red-500" />
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type="button"
                className="group w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-950 outline-none transition-colors hover:bg-lime-500 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={content === ""}
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
