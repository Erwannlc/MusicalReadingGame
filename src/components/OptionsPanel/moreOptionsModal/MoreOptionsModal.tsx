import { type FC, useState } from "react";
import type { KeyboardLayout, Language, Messages } from "business";
import { Dialog, MoreButton } from "components/UI";
import MoreOptionsContent from "./MoreOptionsContent";
import "./more-options--modal.scss";

interface Props {
  onLanguageChange: (language: Language) => void
  onKbLayoutChange: (kbLayout: KeyboardLayout) => void
  className: string
  language: Language
  kbLayout: KeyboardLayout
  messages: Messages
};

const MoreOptionsModal: FC<Props> = ({
  onLanguageChange,
  onKbLayoutChange,
  className,
  language,
  kbLayout,
  messages
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen((bool) => !bool);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (modalOpen) {
    return (
    <Dialog
      isOpen={modalOpen}
      onRequestClose={closeModal}
      closeOnOutsideClick
      className={className}
    >
      <MoreOptionsContent
        onLanguageChange={onLanguageChange}
        onKbLayoutChange={onKbLayoutChange}
        language={language}
        messages={messages}
        kbLayout={kbLayout}
      />
    </Dialog>
    );
  } else {
    return <MoreButton className="" onMoreOpen={openModal}/>;
  }
};

export default MoreOptionsModal;
