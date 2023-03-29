import { useEffect, useRef, type FC } from "react";
import {
  Clef, Status
} from "business";
import type {
  SingleClef,
  Note,
  Sheet,
  Levels,
  GameStatus
} from "business";
import { renderMobileVFSheet } from "components/VexFlowBox";

interface Props {
  gameSheet: Sheet
  clef: Clef
  level: Levels
  gameLength: number
  gameStatus: GameStatus
};

const VFBoxMobile: FC<Props> = ({
  gameSheet,
  clef,
  level,
  gameStatus
}) => {
  const { status, round } = gameStatus;
  const { mobileStave, solution } = gameSheet;

  const isPlaying = status === Status.playing;
  const isReportingFeedback = status === Status.reportingFeedback;

  const outputMobileRef = useRef<HTMLDivElement | null>(null);
  const outputMobile = outputMobileRef.current;

  useEffect(() => {
    if (!isPlaying) {
      const defaultNote: Note = mobileStave[0];
      const defaultClef: SingleClef = clef === Clef.treble
        ? Clef.treble
        : Clef.bass;
      if (outputMobile) outputMobile.innerHTML = "";
      renderMobileVFSheet(defaultNote, defaultClef, level, false);
    } else if (isPlaying) {
      const gameNote = mobileStave[round - 1];
      const gameClef: SingleClef = clef === Clef.both
        ? solution[round - 1][1]
        : clef;
      if (outputMobile) outputMobile.innerHTML = "";
      renderMobileVFSheet(gameNote, gameClef, level, isPlaying);
    };
  }, [isPlaying, outputMobile, clef, level, mobileStave, round, solution]);

  const className = isReportingFeedback ? "hide" : "";

  return (
    <div id="vexboxMobile" className={className}>
      <div ref={outputMobileRef} id="mobile-output"></div>
    </div>
  );
};

export default VFBoxMobile;
