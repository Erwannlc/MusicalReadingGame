import type { Note } from "business";
import { keyboardKeyNotes, pianoScale } from "business/data/appData";

function playNoteSound (
  audioContext: AudioContext,
  freq: number
) {
  const osc = audioContext.createOscillator();
  const noteGainNode = audioContext.createGain();
  noteGainNode.connect(audioContext.destination);

  const zeroGain = 0.00001;
  const maxGain = 0.5;
  const sustainedGain = 0.001;

  noteGainNode.gain.value = zeroGain;

  const setAttack = () =>
    noteGainNode.gain.exponentialRampToValueAtTime(
      maxGain,
      audioContext.currentTime + 0.01
    );
  const setDecay = () =>
    noteGainNode.gain.exponentialRampToValueAtTime(
      sustainedGain,
      audioContext.currentTime + 1
    );
  const setRelease = () =>
    noteGainNode.gain.exponentialRampToValueAtTime(
      zeroGain,
      audioContext.currentTime + 2
    );

  setAttack();
  setDecay();
  setRelease();

  osc.connect(noteGainNode);
  osc.type = "triangle";

  if (Number.isFinite(freq)) {
    osc.frequency.value = freq;
  };
  osc.start();
  return osc;
}

function getKeyfromNote (note: Note): string {
  const keyData =
    keyboardKeyNotes.filter(keyData => keyData.noteId === note.getId());
  return keyData[0].azerty;
}

function getNotefromKey (key: string): Note {
  const keyData =
    keyboardKeyNotes.filter(keyData => keyData.azerty === key);
  const note = pianoScale.filter(note => note.getId() === keyData[0].noteId)[0];
  return note;
}

const azertyKeys = keyboardKeyNotes.map(note => note.azerty);

export {
  playNoteSound,
  getKeyfromNote,
  getNotefromKey,
  azertyKeys
};
