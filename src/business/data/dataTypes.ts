import { type FC, type ReactNode } from "react";

enum Clef {
  treble,
  bass,
  both
}
type SingleClef = Clef.treble | Clef.bass;
type ClefName = keyof typeof Clef;

enum Device {
  Piano,
  Pads,
}

type PlayMode = "manual" | "auto1" | "auto2" | "auto3";

interface GameOptions {
  tempo: number
  level: number
  clef: Clef
  playMode: PlayMode
}

enum Levels {
  level0,
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7
}

interface LevelRange {
  startNoteId: string
  endNoteId?: string
};

interface LevelsRange {
  treble: LevelRange[]
  bass: LevelRange[]
};
// type LevelsName = keyof typeof Levels;

interface LevelScales {
  treble: {
    [Levels.level0]: ScaleNotes
    [Levels.level1]: ScaleNotes
    [Levels.level2]: ScaleNotes
    [Levels.level3]: ScaleNotes
    [Levels.level4]: ScaleNotes
    [Levels.level5]: ScaleNotes
    [Levels.level6]: ScaleNotes
    [Levels.level7]: ScaleNotes
  }
  bass: {
    [Levels.level0]: ScaleNotes
    [Levels.level1]: ScaleNotes
    [Levels.level2]: ScaleNotes
    [Levels.level3]: ScaleNotes
    [Levels.level4]: ScaleNotes
    [Levels.level5]: ScaleNotes
    [Levels.level6]: ScaleNotes
    [Levels.level7]: ScaleNotes
  }
}

type NaturalNoteName =
"A" |
"B" |
"C" |
"D" |
"E" |
"F" |
"G" ;

interface NoteName {
  naturalName: NaturalNoteName
  isSharp: boolean
  isRest?: boolean
};

const chromaticScale: NoteName[] = [
  { naturalName: "A", isSharp: false },
  { naturalName: "A", isSharp: true },
  { naturalName: "B", isSharp: false },
  { naturalName: "C", isSharp: false },
  { naturalName: "C", isSharp: true },
  { naturalName: "D", isSharp: false },
  { naturalName: "D", isSharp: true },
  { naturalName: "E", isSharp: false },
  { naturalName: "F", isSharp: false },
  { naturalName: "F", isSharp: true },
  { naturalName: "G", isSharp: false },
  { naturalName: "G", isSharp: true }
];

class Note {
  constructor (name: NoteName, octave: number) {
    this.name = name;
    this.naturalName = name.naturalName;
    this.isSharp = name.isSharp;
    this.isRest = name.isRest ?? false;
    this.fullName = `${this.naturalName}${this.isSharp ? "#" : ""}`;
    this.octave = octave;
  }

  name: NoteName;
  octave: number;
  naturalName: NaturalNoteName;
  fullName: string;
  isSharp: boolean;
  isRest: boolean;

  getId (): string {
    return `${this.fullName}.${this.octave}`;
  }

  play (): void {
  }

  getHz (): number {
    const index = chromaticScale.indexOf(this.name);
    const A4 = 440;
    const octave: number = this.naturalName === "A" || this.naturalName === "B"
      ? this.octave + 1
      : this.octave;
    const N = index + 12 * (octave - 5);
    const freq = A4 * Math.pow(2, N / 12);
    return freq;
  };
}

type ScaleNotes = Note[];

type NotePlayed = Note | undefined;

interface Staff {
  notes: ScaleNotes
}

interface Answer {
  noteName: NaturalNoteName | "?" | undefined
  isWrong: boolean | undefined
}

interface Sheet {
  staves: Staff[]
  answers: Answer[]
  solution: Array<[NaturalNoteName, SingleClef]>
  score: number
  mobileStave: Note[]
}

interface AnnounceProps {
  className?: string
  content: FC | ReactNode
  isModal?: boolean
  modal?: {
    className?: string
    content: FC | ReactNode
  }
};

enum Status {
  initializing,
  playing,
  reportingFeedback,
  ending
}

interface GameStatus {
  status: Status
  round: number
}

interface RoundCorrection {
  key: string
  isWrong: boolean
  content: ReactNode
};

interface CorrectionType {
  gameAnswers: RoundCorrection[]
  gameSolution: RoundCorrection[]
  messages: Messages
}

enum EnumNoteName {
  A,
  ASharp,
  B,
  C,
  CSharp,
  D,
  DSharp,
  E,
  F,
  FSharp,
  G,
  GSharp
}

type Language = "en" | "fr";

type Messages = Record<string, string>;

export {
  chromaticScale,
  EnumNoteName,
  Device,
  Note,
  Clef,
  Levels,
  Status
};

export type {
  SingleClef,
  PlayMode,
  GameOptions,
  NaturalNoteName,
  NoteName,
  ScaleNotes,
  Answer,
  Staff,
  Sheet,
  LevelRange,
  LevelsRange,
  LevelScales,
  ClefName,
  AnnounceProps,
  CorrectionType,
  GameStatus,
  NotePlayed,
  Language,
  Messages
};
