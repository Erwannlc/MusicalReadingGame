import type {
  ScaleNotes,
  Note,
  SingleClef
} from "business";
import {
  Clef,
  Levels
} from "business";

const VFDurationCodes = {
  wholeNote: "/1", // ronde
  minim: "/h", // blanche
  quarterNote: "/q", // noire
  eightNote: "/8", // croche
  sixteenthNote: "/16" // double croche
};

type VFDuration = keyof typeof VFDurationCodes;

function getVFNote (
  note: Note,
  onlyNatural: boolean,
  duration: VFDuration,
  clef: SingleClef,
  current: number = 1,
  isRest: boolean = false
) {
  function getNoteName (): string {
    if (onlyNatural) {
      return note.naturalName;
    } else return note.fullName;
  }

  const vfNoteName: string = `${getNoteName()}${String(note.octave)}`;
  const rest = isRest ? "/r" : "";
  const vfNoteId = `[id="${clef === Clef.treble
    ? "treble"
    : "bass"}-n${current}"]`;
  const vfNote: string =
    vfNoteName +
    VFDurationCodes[duration] +
    rest +
    vfNoteId;
  return vfNote;
};

async function getVexFlowAPINotes (notes: ScaleNotes, clef: SingleClef) {
  const vexFlowNotes: string[] = [];
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const isRest = note.isRest;
    const vfNote = getVFNote(note, true, "quarterNote", clef, (i + 1), isRest);
    vexFlowNotes.push(vfNote);
  };
  return vexFlowNotes;
}

function getVFHeight (level: Levels, clef: Clef): number {
  if (clef === Clef.both) {
    switch (level) {
      case Levels.level6 :
      case Levels.level7 :
        return 380;
      case Levels.level5 :
        return 350;
      case Levels.level4 :
        return 320;
      default:
        return 300;
    }
  } else return 250;
}

function getStaveY (level: Levels, clef: Clef): number {
  if (clef !== Clef.bass) {
    switch (level) {
      case Levels.level6 :
      case Levels.level7 :
        return 75;
      case Levels.level5 :
        return 60;
      case Levels.level4 :
        return 40;
      default:
        return 30;
    }
  } else return 30;
}

function getMobileStaveY (level: Levels, clef: Clef): number {
  if (clef !== Clef.bass) {
    switch (level) {
      case Levels.level6 :
      case Levels.level7 :
        return 60;
      case Levels.level5 :
        return 50;
      case Levels.level4 :
        return 40;
      default:
        return 30;
    }
  } else return 20;
}

export {
  VFDurationCodes,
  getStaveY,
  getMobileStaveY,
  getVFHeight,
  getVFNote,
  getVexFlowAPINotes
};
export type {
  VFDuration
};
