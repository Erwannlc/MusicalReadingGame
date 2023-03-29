import type { FC } from "react";
import type { Language, Messages } from "business";
import LanguageSelector from "./LanguageSelector";

interface Props {
  onLanguageChange: (language: Language) => void
  messages: Messages
  language: Language
}

const MoreOptionsContent: FC<Props> = ({
  onLanguageChange,
  messages,
  language
}) => {
  const className = "more-options--content";

  const {
    MORE_OPTIONS_TITLE
  } = messages;

  return (
  <div className={className}>
      <p className={`${className} title`}>{MORE_OPTIONS_TITLE}</p>
      <LanguageSelector
        onChange={onLanguageChange}
        language={language}
        messages={messages}/>
  </div>
  );
};

export default MoreOptionsContent;
