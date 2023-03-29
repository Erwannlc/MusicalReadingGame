import { type FC, useState } from "react";
import type { Language, Messages } from "business";
import { Dialog } from "components/UI";
import MoreButton from "components/UI/Buttons/MoreButton";
import MoreOptionsContent from "./MoreOptionsContent";
import "./more-options--modal.scss";

interface Props {
  className: string
  onLanguageChange: (language: Language) => void
  language: Language
  messages: Messages
};

const MoreOptionsModal: FC<Props> = ({
  onLanguageChange,
  className,
  language,
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
        language={language}
        messages={messages}
      />
    </Dialog>
    );
  } else {
    return (
    <MoreButton className="" onMoreOpen={openModal}/>
    );
  }
};

export default MoreOptionsModal;
