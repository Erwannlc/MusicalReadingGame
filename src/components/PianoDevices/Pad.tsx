import type { FC } from "react";
import type { Language, NaturalNoteName, Note } from "business";
import { utils } from "shared";

const { getNoteLatinName } = utils;

interface Props {
  onNotePlayedStarted: () => void
  getNotesMap: () => Map<any, any>
  note: Note
  color: string
  language: Language
};

const Pad: FC<Props> = ({
  onNotePlayedStarted,
  getNotesMap,
  note,
  color,
  language
}) => {
  const noteName = language === "fr"
    ? getNoteLatinName(note)
    : note.naturalName;
  const padName: NaturalNoteName = note.naturalName;

  return (
      <button
        ref={(node) => {
          const notesMap = getNotesMap();
          if (node) {
            notesMap.set(note.getId(), node);
          } else {
            notesMap.delete(note.getId());
          }
        }}
        onMouseDown={onNotePlayedStarted}
        onTouchStart={onNotePlayedStarted}
        // style={{ color }}>
        style={{ color: `var(--colorPad${padName})` }}>
        {noteName}
      </button>
  );
};

export default Pad;
