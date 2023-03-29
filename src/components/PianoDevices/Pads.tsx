import { useCallback, useRef } from "react";
import type { FC, TouchEvent } from "react";
import type { Language, Note } from "business";
import Pad from "./Pad";

interface Props {
  padsScale: Note[]
  onNotePlayed: (note: Note) => void
  language: Language
};

const Pads: FC<Props> = ({
  padsScale,
  onNotePlayed,
  language
}) => {
  const notesNodeRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  function getNotesMap (): Map<any, any> {
    return notesNodeRef.current;
  }

  const playNote = useCallback((note: Note) => {
    const noteNode = notesNodeRef.current.get(note.getId());
    noteNode?.classList.add("pressed");
    onNotePlayed(note);
  }, [onNotePlayed]);

  function releasePressedNotes () {
    for (const [, noteNode] of notesNodeRef.current) {
      noteNode.classList.remove("pressed");
    };
  }

  function handleTouchEnd (e: TouchEvent) {
    e.preventDefault();
    e.stopPropagation();
    releasePressedNotes();
  }

  function getNoteColor (i: number) {
    if (i % 2 === 0) {
      return "var(--colorPadC";
    } else return "var(--colorPadF";
  }

  return (
    <div className="pads"
      onMouseUp={releasePressedNotes}
      onTouchEnd={handleTouchEnd}
      >
      {padsScale.map((note, i) => (
        <Pad
          key={note.getId()}
          note={note}
          getNotesMap={getNotesMap}
          onNotePlayedStarted={() => {
            playNote(note);
          }}
          color={getNoteColor(i)}
          language={language}
        />
      ))}
    </div>
  );
};

export default Pads;
