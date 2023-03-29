import type { FC } from "react";
import { Device, type Messages } from "business";
import PianoIcon from "./PianoIcon";
import "./device-switch.scss";

interface Props {
  onChange: (stringDevice: "pads" | "piano") => void
  device: Device
  disabled: boolean
  messages: Messages
};

const DeviceSwitch: FC<Props> = ({ device, onChange, disabled, messages }) => {
  const isPianoDevice = device === Device.Piano;
  const {
    OPTIONS_TOOLTIP_DEVICES_ISPIANO,
    OPTIONS_TOOLTIP_DEVICES_ISPADS
  } = messages;

  function handleChange () {
    const newStringDevice = isPianoDevice ? "pads" : "piano";
    onChange(newStringDevice);
  }
  const className = isPianoDevice ? "depth is-active" : "depth";
  const tooltip = isPianoDevice
    ? OPTIONS_TOOLTIP_DEVICES_ISPIANO
    : OPTIONS_TOOLTIP_DEVICES_ISPADS;

  return (
  <div className="device-option">
    <div className="realistic-switch" >
      <button
      className={className}
      type="button"
      onClick={handleChange}
      title={tooltip}>
        <PianoIcon />
      </button>
    </div>
  </div>
  );
};

export default DeviceSwitch;
