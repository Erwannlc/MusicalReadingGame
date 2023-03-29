import type { FC } from "react";
import { Clef, type Messages, type GameOptions } from "business";
import { utils } from "shared";
import getOptionsStatus from "./optionsStatusUtils";
import "./options-status--bar.scss";

interface Props {
  options: GameOptions
  language: "fr" | "en"
  onToggleOptions: () => void
  messages: Messages
};

const OptionsStatusBar: FC<Props> = ({
  options,
  language,
  onToggleOptions,
  messages
}) => {
  const { getIntervalTime } = utils.optionsGetters;
  const intervalTime = getIntervalTime(options.tempo);

  const isIndicatorTooLarge: boolean = (
    (options.clef === Clef.both)
  );
  const { tooltips, indicator } =
    getOptionsStatus(options, intervalTime, language, messages);

  const className = isIndicatorTooLarge
    ? "options-status--bar largest"
    : "options-status--bar";

  return (
    <div
      className={className}
      title={tooltips.global}
      onClick={onToggleOptions}
    >
      <span title={tooltips.tempo}>{indicator.tempo}</span>
      <span title={tooltips.level}>{indicator.level}</span>
      <span title={tooltips.clef}>{indicator.clef}</span>
    </div>
  );
};

export default OptionsStatusBar;
