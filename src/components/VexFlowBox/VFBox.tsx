import { useEffect, useRef, type FC } from "react";
import { Status } from "business";
import type {
  Sheet,
  Clef,
  Levels,
  GameStatus
} from "business";
import { renderVFSheet } from "components/VexFlowBox";
import { utils } from "shared";

const { displayNoteOnSheet, highlightWrongNote } = utils;

interface Props {
  gameSheet: Sheet
  clef: Clef
  level: Levels
  gameLength: number
  gameStatus: GameStatus
};

const VFBox: FC<Props> = ({
  gameSheet,
  clef,
  level,
  gameLength,
  gameStatus
}) => {
  const { staves, solution, answers } = gameSheet;
  const { status, round } = gameStatus;
  const isPlaying = status === Status.playing;
  const outputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    renderVFSheet(clef, level, gameLength, staves, outputRef);
  }, [staves, clef, level, gameLength]);

  useEffect(() => {
    if (isPlaying && round > 0) {
      displayNoteOnSheet(round, clef);
    };
  }, [clef, isPlaying, round]);

  useEffect(() => {
    if (round > 1) {
      highlightWrongNote(round, answers, solution);
    };
  }, [answers, round, solution]);

  return (
    <div id="vexbox">
      <div ref={outputRef} id="output"></div>
    </div>
  );
};

export default VFBox;
