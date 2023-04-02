import type { FC } from "react";
import type { Note } from "business";
import { utils } from "shared";

const { getPianoNoteColor } = utils.deviceGetters;

interface PianoNoteProps {
  note: Note
  onNotePlayStarted: () => void
  getNotesMap: () => Map<any, any>
  notePrint: string
  tooltip: string
}

const PianoNote: FC <PianoNoteProps> = ({
  note,
  onNotePlayStarted,
  getNotesMap,
  notePrint,
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
      {notePrint}
    </li>
);

export default PianoNote;
