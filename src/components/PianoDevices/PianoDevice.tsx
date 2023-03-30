import { type FC } from "react";
import type { KeyboardLayout, Language, Note } from "business";
import { data, Device } from "business";
import Piano from "./Piano";
import Pads from "./Pads";
import "./pads.scss";
import "./piano.scss";

const {
  pianoScale,
  padsScale,
  mobilePianoScale
} = data.appData;

interface Props {
  device: Device
  onNotePlayed: (note: Note) => void
  isMobile: boolean
  language: Language
  kbLayout: KeyboardLayout
}

const PianoDevice: FC<Props> = ({
  device,
  onNotePlayed,
  isMobile,
  language,
  kbLayout
}) => {
  const isPiano: boolean = device === Device.Piano;
  const isPads: boolean = device === Device.Pads;
  const scale = isMobile ? mobilePianoScale : pianoScale;

  return (
  <>
    <div className="piano-device">
      {isPiano &&
        <Piano
          pianoScale={scale}
          onNotePlayed={onNotePlayed}
          kbLayout={kbLayout}
        />}
      {isPads &&
        <Pads
          padsScale={padsScale}
          onNotePlayed={onNotePlayed}
          language={language}
        />}
    </div>
  </>
  );
};

export default PianoDevice;
