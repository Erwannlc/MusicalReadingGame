import {
  Clef,
  Note,
  EnumNoteName
} from "./dataTypes";
import type {
  NaturalNoteName,
  ScaleNotes,
  Answer,
  Staff,
  Sheet,
  SingleClef,
  Levels,
  LevelRange
} from "./dataTypes";
import { levelData, chromaticScale, notes } from "./appData";
import { randomizeInteger } from "shared/helpers";

function createDataNotes () {
  const notes: Note[] = [];
  for (let octave = 0; octave < 9; octave++) {
    for (const noteName of chromaticScale) {
      if (noteName === chromaticScale[EnumNoteName.C]) {
        if (octave < 8) {
          octave++;
        } else break;
      } else if (noteName === chromaticScale[EnumNoteName.A]) {
        if (octave > 1) octave--;
      }
      if ((noteName === chromaticScale[EnumNoteName.D] ||
         noteName === chromaticScale[EnumNoteName.CSharp]) && octave === 8) {
        break;
      }
      notes.push(new Note(noteName, octave));
    }
  };
  return notes;
};

function createPianoScale (
  startNoteId: string = "C.4",
  endNoteId: "F.5" | "C.5",
  onlyNatural: boolean
): Note[] {
  const startNote = notes.findIndex(note => note.getId() === startNoteId);
  const endNote = notes.findIndex(note => note.getId() === endNoteId);
  const pianoScale = notes.slice(startNote, endNote);
  if (onlyNatural) {
    return pianoScale.filter(note => !note.isSharp);
  } else return pianoScale;
};

function createLevelScale (
  range: LevelRange,
  onlyNatural: boolean = true
): ScaleNotes {
  const { startNoteId, endNoteId } = range;
  const startNote = notes.findIndex(note => note.getId() === startNoteId);
  const endNote = endNoteId
    ? notes.findIndex(note => note.getId() === endNoteId)
    : null;
  const newScale = endNote
    ? notes.slice(startNote, endNote)
    : notes.slice(startNote);
  const newNaturalScale = newScale.filter(note => !note.isSharp);
  return onlyNatural ? newNaturalScale : newScale;
};

async function createGameStave (
  clef: SingleClef,
  level: Levels,
  gameLength: number
): Promise<Staff> {
  const newNotes: ScaleNotes = [];
  const levelNotes = clef === Clef.treble
    ? levelData.treble[level]
    : levelData.bass[level];
  for (let i = 0; i < gameLength; i++) {
    const index = randomizeInteger(0, levelNotes.length - 1);
    let note = levelNotes[index];
    // prevents repeating notes
    if (i > 0 && note.getId() === newNotes[i - 1].getId()) {
      const actualLevelNotes = levelNotes
        .filter(note => note.getId() !== newNotes[i - 1].getId());
      const newIndex = randomizeInteger(0, actualLevelNotes.length - 1);
      note = actualLevelNotes[newIndex];
    }
    newNotes.push(note);
  };
  return { notes: newNotes };
};

function getSolution (
  staff: Staff,
  clef: SingleClef
): Array<[NaturalNoteName, SingleClef]> {
  const newSolution: Array<[NaturalNoteName, SingleClef]> = [];
  for (const note of staff.notes) {
    newSolution.push([note.naturalName, clef]);
  };
  return newSolution;
}

function getEmptyAnswers (gameLength: number): Answer[] {
  const emptyAnswers = [];
  for (let i = 0; i < gameLength; i++) {
    const emptyAnswer: Answer = {
      noteName: undefined,
      isWrong: undefined
    };
    emptyAnswers.push(emptyAnswer);
  }
  return emptyAnswers;
}

async function createGameSingleSheet (
  clef: SingleClef,
  level: Levels,
  gameLength: number
): Promise<Sheet> {
  const newStave: Staff = await createGameStave(clef, level, gameLength);
  const newSolution = getSolution(newStave, clef);
  return {
    staves: [newStave],
    answers: getEmptyAnswers(gameLength),
    solution: newSolution,
    score: -1,
    mobileStave: newStave.notes
  };
}

function getBothClefSolutionAndMobileStave (
  trebleStave: Staff,
  bassStave: Staff,
  gameLength: number
) {
  const newSolution: Array<[NaturalNoteName, SingleClef]> = [];
  const newMobileStave = [];

  for (let i = 0; i < gameLength; i++) {
    if (randomizeInteger(1, 10) > 5) {
      newSolution.push([trebleStave.notes[i].naturalName, Clef.treble]);
      newMobileStave.push(trebleStave.notes[i]);
      bassStave.notes[i] = bassRestNote;
    } else {
      newSolution.push([bassStave.notes[i].naturalName, Clef.bass]);
      newMobileStave.push(bassStave.notes[i]);
      trebleStave.notes[i] = trebleRestNote;
    }
  }
  return { newSolution, newMobileStave };
}

const trebleRestNote = new Note(
  { naturalName: "G", isSharp: false, isRest: true }, 4);
const bassRestNote = new Note(
  { naturalName: "F", isSharp: false, isRest: true }, 3);

async function createGameSheet (
  clef: Clef,
  level: Levels,
  gameLength: number
): Promise<Sheet> {
  switch (clef) {
    case Clef.treble :
    case Clef.bass : {
      return await createGameSingleSheet(clef, level, gameLength);
    }
    case Clef.both : {
      const trebleStave =
          await createGameStave(Clef.treble, level, gameLength);
      const bassStave =
          await createGameStave(Clef.bass, level, gameLength);
      const { newSolution, newMobileStave } =
        getBothClefSolutionAndMobileStave(trebleStave, bassStave, gameLength);
      return {
        staves: [trebleStave, bassStave],
        answers: getEmptyAnswers(gameLength),
        solution: newSolution,
        score: -1,
        mobileStave: newMobileStave
      };
    }
  };
};

export {
  createDataNotes,
  createLevelScale,
  createPianoScale,
  createGameSheet,
  getEmptyAnswers
};
