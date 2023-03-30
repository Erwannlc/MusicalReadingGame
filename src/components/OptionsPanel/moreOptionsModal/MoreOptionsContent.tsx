import type { FC } from "react";
import type { KeyboardLayout, Language, Messages } from "business";
import LanguageSelector from "./LanguageSelector";
import KBLayoutSelector from "./KeyBoardLayoutSelector";

interface Props {
  onLanguageChange: (language: Language) => void
  onKbLayoutChange: (kbLayout: KeyboardLayout) => void
  language: Language
  kbLayout: KeyboardLayout
  messages: Messages
}

const MoreOptionsContent: FC<Props> = ({
  onLanguageChange,
  onKbLayoutChange,
  language,
  kbLayout,
  messages
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
      <KBLayoutSelector
        onChange={onKbLayoutChange}
        kbLayout={kbLayout}
        messages={messages}/>
  </div>
  );
};

export default MoreOptionsContent;
