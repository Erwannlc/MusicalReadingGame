import type { FC, TouchEvent } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import type { Note } from "business";
import {
  azertyKeys,
  getNotefromKey,
  playNoteSound
} from "./pianoUtils";
import PianoNote from "./PianoNote";
import { getNoteLatinName } from "shared/utils";
// Thx to Bret Cameron :
// https://css-tricks.com/how-to-code-a-playable-synth-keyboard/
// https://codepen.io/BretCameron/pen/MWmyWeo

interface Props {
  pianoScale: Note[]
  onNotePlayed: (note: Note) => void
};

const Piano: FC<Props> = ({
  pianoScale,
  onNotePlayed
}) => {
  const audioContext = useMemo(() => new window.AudioContext(), []);
  const oscillators = useMemo(() => new Map<string, OscillatorNode>(), []);

  const notesNodeRef = useRef<Map<string, HTMLLIElement>>(new Map());
  const keyUpNoteIdRef = useRef<string>();

  function getNotesMap (): Map<any, any> {
    return notesNodeRef.current;
  }

  const playNote = useCallback((note: Note) => {
    const noteId = note.getId();
    const noteNode = notesNodeRef.current.get(noteId);
    noteNode?.classList.add("pressed");
    oscillators.set(
      noteId,
      playNoteSound(audioContext, note.getHz())
    );
    if (!note.isSharp) {
      onNotePlayed(note);
    }
  }, [audioContext, onNotePlayed, oscillators]);

  function releasePressedNotes () {
    for (const [noteId, noteNode] of notesNodeRef.current) {
      if (keyUpNoteIdRef.current) {
        if (noteId === keyUpNoteIdRef.current) {
          noteNode.classList.remove("pressed");
          keyUpNoteIdRef.current = undefined;
        }
      } else {
        noteNode.classList.remove("pressed");
      }
    };
  }

  function handleTouchEnd (e: TouchEvent) {
    e.preventDefault();
    e.stopPropagation();
    releasePressedNotes();
  }

  // handle piano Note played on computer's keyboard
  useEffect(() => {
    function onKeyDown (e: KeyboardEvent) {
      const eventKey: string = e.key.toUpperCase();
      if (azertyKeys.includes(eventKey) && !e.repeat) {
        e.preventDefault();
        playNote(getNotefromKey(eventKey));
      }
    }

    function onKeyUp (e: KeyboardEvent) {
      const eventKey: string = e.key.toUpperCase();
      if (azertyKeys.includes(eventKey)) {
        e.preventDefault();
        keyUpNoteIdRef.current = getNotefromKey(eventKey).getId();
        releasePressedNotes();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  return (
    <ul className="piano"
      onMouseUp={releasePressedNotes}
      onTouchEnd={handleTouchEnd}
      >
      {pianoScale.map(note => (
        <PianoNote
          key={note.getId()}
          note={note}
          getNotesMap={getNotesMap}
          onNotePlayStarted={() => {
            playNote(note);
          }}
          tooltip={getNoteLatinName(note)}
        />
      ))}
    </ul>
  );
};

export default Piano;
