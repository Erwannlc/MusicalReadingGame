import type { MutableRefObject } from "react";
import { Vex } from "vexflow";
import {
  Clef,
  type Levels,
  type Staff
} from "business";
import {
  getStaveY,
  getVFHeight,
  getVexFlowAPINotes
} from "./vexFlowAPIUtils";

const renderVFSheet = async (
  clef: Clef,
  level: Levels,
  gameLength: number,
  staves: Staff[],
  outputRef: MutableRefObject<HTMLDivElement | null>
) => {
  const vexFlowScoreDimensions = {
    containerWidth: 575,
    containerHeight: getVFHeight(level, clef),
    staveWidth: 500,
    staveX: 30,
    staveY: getStaveY(level, clef)
  };
  const {
    containerWidth,
    containerHeight,
    staveWidth,
    staveX,
    staveY
  } = vexFlowScoreDimensions;

  const outputNode = outputRef.current;
  if (outputNode) { outputNode.innerHTML = ""; }

  document.documentElement.style.setProperty(
    "--vexflow_height", `${containerHeight}px`);
  const vf = new Vex.Flow.Factory({
    renderer: {
      elementId: "output",
      width: containerWidth,
      height: containerHeight
    }
  });
  const system = vf.System({ width: staveWidth, x: staveX, y: staveY });
  switch (clef) {
    case Clef.treble : {
      const staff = await getVexFlowAPINotes(staves[0].notes, clef);
      const trebleVoice = staff.toString();
      const scoreG = vf.EasyScore();
      system.addStave({
        voices: [
          scoreG.voice(scoreG.notes(trebleVoice),
            { time: `${gameLength.toString()}/4` })
        ]
      }).addClef("treble");
      vf.draw();
      break;
    }
    case Clef.bass : {
      const staff = await getVexFlowAPINotes(staves[0].notes, clef);
      const bassVoice = staff.toString();
      const scoreF = vf.EasyScore();
      system.addStave({
        voices: [
          scoreF.voice(scoreF.notes(bassVoice, { clef: "bass" }),
            { time: `${gameLength.toString()}/4` })
        ]
      }).addClef("bass");
      vf.draw();
      break;
    }
    case Clef.both : {
      if (staves.length === 2) {
        const trebleStave = await getVexFlowAPINotes(
          staves[0].notes,
          Clef.treble
        );
        const trebleVoice = trebleStave.toString();
        const bassStave = await getVexFlowAPINotes(
          staves[1].notes,
          Clef.bass
        );
        const bassVoice = bassStave.toString();
        const scoreBoth = vf.EasyScore();
        system.addStave({
          voices: [
            scoreBoth.voice(scoreBoth.notes(trebleVoice),
              { time: `${gameLength.toString()}/4` })
          ]
        }).addClef("treble");
        system.addStave({
          voices: [
            scoreBoth.voice(
              scoreBoth.notes(bassVoice, { clef: "bass" }),
              { time: `${gameLength.toString()}/4` })
          ]
        }).addClef("bass");
        system.addConnector();
        vf.draw();
        break;
      }
    }
  };
};

export default renderVFSheet;
