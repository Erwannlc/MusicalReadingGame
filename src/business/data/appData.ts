import {
  chromaticScale,
  Clef,
  Levels,
  Status
} from "./dataTypes";
import type {
  Sheet,
  GameOptions,
  Language,
  LevelsRange,
  LevelScales,
  Note,
  GameStatus
} from "./dataTypes";
import {
  createGameSheet,
  createDataNotes,
  createLevelScale,
  createPianoScale
} from "./dataUtils";
const notes: Note[] = createDataNotes();

const keyboardKeyNotes = [
  { noteId: "C.4", azerty: "Q", qwerty: "A" },
  { noteId: "C#.4", azerty: "Z", qwerty: "W" },
  { noteId: "D.4", azerty: "S", qwerty: "S" },
  { noteId: "D#.4", azerty: "E", qwerty: "E" },
  { noteId: "E.4", azerty: "D", qwerty: "D" },
  { noteId: "F.4", azerty: "F", qwerty: "F" },
  { noteId: "F#.4", azerty: "T", qwerty: "T" },
  { noteId: "G.4", azerty: "G", qwerty: "G" },
  { noteId: "G#.4", azerty: "Y", qwerty: "Y" },
  { noteId: "A.4", azerty: "H", qwerty: "H" },
  { noteId: "A#.4", azerty: "U", qwerty: "U" },
  { noteId: "B.4", azerty: "J", qwerty: "J" },
  { noteId: "C.5", azerty: "K", qwerty: "K" },
  { noteId: "C#.5", azerty: "O", qwerty: "O" },
  { noteId: "D.5", azerty: "L", qwerty: "L" },
  { noteId: "D#.5", azerty: "P", qwerty: "P" },
  { noteId: "E.5", azerty: "M", qwerty: ";" }
];

const pianoScale = createPianoScale("C.4", "F.5", false);
const mobilePianoScale = createPianoScale("C.4", "C.5", false);
const padsScale = createPianoScale("C.4", "C.5", true);

const levelsRange: LevelsRange = {
  treble: [
    { startNoteId: "E.4", endNoteId: "B.4" },
    { startNoteId: "C.4", endNoteId: "D.5" },
    { startNoteId: "B.3", endNoteId: "A.5" },
    { startNoteId: "A.3", endNoteId: "C.6" },
    { startNoteId: "G.3", endNoteId: "A.6" },
    { startNoteId: "F.3", endNoteId: "C.7" },
    { startNoteId: "E.3", endNoteId: "A.7" },
    { startNoteId: "E.3", endNoteId: "C.8" }
  ],
  bass: [
    { startNoteId: "C.3", endNoteId: "G.3" },
    { startNoteId: "F.2", endNoteId: "A.3" },
    { startNoteId: "E.2", endNoteId: "B.3" },
    { startNoteId: "C.2", endNoteId: "C.4" },
    { startNoteId: "B.1", endNoteId: "E.4" },
    { startNoteId: "G.1", endNoteId: "F.4" },
    { startNoteId: "C.1", endNoteId: "F.4" },
    { startNoteId: "A.0", endNoteId: "F.4" }
  ]
};
const levelData: LevelScales = {
  treble: {
    [Levels.level0]: createLevelScale(levelsRange.treble[0]),
    [Levels.level1]: createLevelScale(levelsRange.treble[1]),
    [Levels.level2]: createLevelScale(levelsRange.treble[2]),
    [Levels.level3]: createLevelScale(levelsRange.treble[3]),
    [Levels.level4]: createLevelScale(levelsRange.treble[4]),
    [Levels.level5]: createLevelScale(levelsRange.treble[5]),
    [Levels.level6]: createLevelScale(levelsRange.treble[6]),
    [Levels.level7]: createLevelScale(levelsRange.treble[7])
  },
  bass: {
    [Levels.level0]: createLevelScale(levelsRange.bass[0]),
    [Levels.level1]: createLevelScale(levelsRange.bass[1]),
    [Levels.level2]: createLevelScale(levelsRange.bass[2]),
    [Levels.level3]: createLevelScale(levelsRange.bass[3]),
    [Levels.level4]: createLevelScale(levelsRange.bass[4]),
    [Levels.level5]: createLevelScale(levelsRange.bass[5]),
    [Levels.level6]: createLevelScale(levelsRange.bass[6]),
    [Levels.level7]: createLevelScale(levelsRange.bass[7])
  }
};

const tempoValues: string[] = getTempoArr();

function getTempoArr () {
  const tempoArr: string[] = [];
  for (let i = 1; i < 12; i++) {
    tempoArr.push(i.toString());
  }
  return tempoArr;
};

const levelNameValues = getLevelValues("string");
const levelNumericValues = getLevelValues("number");

function getLevelValues (type: "number" | "string") {
  switch (type) {
    case "number" : {
      return Object.values(Levels).filter(
        value => typeof value !== "string"
      );
    }
    case "string" : {
      return Object.values(Levels).filter(
        value => typeof value === "string"
      );
    }
  }
}

const defaultOptions: GameOptions = {
  tempo: 2,
  level: Levels.level4,
  clef: Clef.treble,
  playMode: "auto1"
};

let defaultGameSheet: Sheet;
(async () => {
  const defaultSheet = await createGameSheet(
    defaultOptions.clef,
    defaultOptions.level,
    12
  );
  defaultGameSheet = defaultSheet;
})();

const defaultStatus: GameStatus = {
  status: Status.ending,
  round: 0
};

const defaultLanguage: Language = "fr";

export {
  notes,
  defaultGameSheet,
  tempoValues,
  levelNameValues,
  levelNumericValues,
  defaultOptions,
  defaultStatus,
  defaultLanguage,
  levelsRange,
  levelData,
  chromaticScale,
  keyboardKeyNotes,
  pianoScale,
  mobilePianoScale,
  padsScale
};
