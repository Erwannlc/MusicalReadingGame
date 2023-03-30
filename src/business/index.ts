import * as data from "./data";
import * as features from "./features";
import { createGameSheet } from "./data";

import {
  defaultOptions,
  defaultGameSheet,
  defaultStatus,
  defaultLanguage
} from "./data/appData";

import type {
  SingleClef,
  PlayMode,
  GameOptions,
  NaturalNoteName,
  NoteName,
  ScaleNotes,
  Answer,
  Staff,
  Sheet,
  LevelScales,
  ClefName,
  AnnounceProps,
  CorrectionType,
  GameStatus,
  NotePlayed,
  Language,
  KeyboardLayout,
  Messages
} from "./data/dataTypes";

import {
  Device,
  Note,
  Clef,
  Levels,
  Status
} from "./data/dataTypes";

export {
  createGameSheet,
  defaultGameSheet,
  data,
  features,
  defaultOptions,
  defaultStatus,
  defaultLanguage,
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
  LevelScales,
  ClefName,
  AnnounceProps,
  CorrectionType,
  GameStatus,
  NotePlayed,
  Language,
  KeyboardLayout,
  Messages
};
