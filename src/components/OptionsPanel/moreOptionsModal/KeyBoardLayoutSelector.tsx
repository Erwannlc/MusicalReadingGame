import type { ChangeEvent, FC } from "react";
import type { KeyboardLayout, Messages } from "business";
import "./language-selector.scss";

interface Props {
  onChange: (kbLayout: KeyboardLayout) => void
  messages: Messages
  kbLayout: KeyboardLayout
}

const KBLayoutSelector: FC<Props> = ({
  onChange,
  messages,
  kbLayout
}) => {
  const className = "language-option";
  const disabled = false;

  function handleChange (event: ChangeEvent<HTMLSelectElement>) {
    const newKBLayout = event.target.value as KeyboardLayout;
    onChange(newKBLayout);
  }

  const {
    SELECT_KBLAYOUT_TOOLTIP,
    SELECT_KBLAYOUT_LABEL
  } = messages;

  return (
  <div className={className} title={SELECT_KBLAYOUT_TOOLTIP}>
      <label>
      <p className={`${className} title`}>{SELECT_KBLAYOUT_LABEL}</p>
      <select
        value={kbLayout}
        onChange={handleChange}
        disabled={disabled}
      >
          <option value="azerty">Azerty</option>
          <option value="qwerty">Qwerty</option>
        </select>
      </label>
  </div>
  );
};

export default KBLayoutSelector;
