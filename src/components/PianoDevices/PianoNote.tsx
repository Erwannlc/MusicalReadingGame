import type { FC } from "react";
import type { Note } from "business";
import { utils } from "shared";
import {
  getKeyfromNote
} from "./pianoUtils";

const { getPianoNoteColor } = utils.deviceGetters;

interface PianoNoteProps {
  note: Note
  onNotePlayStarted: () => void
  getNotesMap: () => Map<any, any>
  tooltip: string
}

const PianoNote: FC <PianoNoteProps> = ({
  note,
  onNotePlayStarted,
  getNotesMap,
  tooltip
}) => (
    <li
      ref={(node) => {
        const notesMap = getNotesMap();
        if (node) {
          notesMap.set(note.getId(), node);
        } else {
          notesMap.delete(note.getId());
        }
      }}
      className={getPianoNoteColor(note)}
      onMouseDown={onNotePlayStarted}
      onTouchStart={onNotePlayStarted}
      onContextMenu={(event) => { event.preventDefault(); }}
      title={tooltip}
      >
      {getKeyfromNote(note)}
    </li>
);

export default PianoNote;
