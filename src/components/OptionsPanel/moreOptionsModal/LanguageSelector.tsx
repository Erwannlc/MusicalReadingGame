import type { ChangeEvent, FC } from "react";
import type { Language, Messages } from "business";
import "./language-selector.scss";

interface Props {
  onChange: (language: Language) => void
  messages: Messages
  language: Language
}

const LanguageSelector: FC<Props> = ({
  onChange,
  messages,
  language
}) => {
  const className = "language-option";
  const disabled = false;

  function handleChange (event: ChangeEvent<HTMLSelectElement>) {
    const newLanguage = event.target.value as Language;
    onChange(newLanguage);
  }

  const {
    SELECT_LANGUAGE_TOOLTIP,
    SELECT_LANGUAGE_LABEL
  } = messages;

  return (
  <div className={className} title={SELECT_LANGUAGE_TOOLTIP}>
      <label>
      <p className={`${className} title`}>{SELECT_LANGUAGE_LABEL}</p>
      <select
        value={language}
        onChange={handleChange}
        disabled={disabled}
      >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </label>
  </div>
  );
};

export default LanguageSelector;
