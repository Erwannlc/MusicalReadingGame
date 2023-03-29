import type { FC } from "react";
import "./next-round--btn.scss";

interface Props {
  onNextRound: () => void
  content: string
}
const NextRoundButton: FC<Props> = ({ onNextRound, content }) => (
    <button className="next-round" onClick={onNextRound}>{content}</button>
);

export default NextRoundButton;
