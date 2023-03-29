import React, { type FC, useState } from "react";
import { Dialog } from "components/UI";
import "./feedback-modal.scss";

interface Props {
  children: React.ReactNode
  displayModalContent: () => void
  displayModalParentAnnounce: (openModal: () => void) => void
  className: string
};

const FeedbackModal: FC<Props> = ({
  children,
  displayModalContent,
  displayModalParentAnnounce,
  className
}) => {
  const [modalOpen, setModalOpen] = useState(true);

  const openModal = () => {
    setModalOpen((bool) => !bool);
    displayModalContent();
  };

  const closeModal = () => {
    setModalOpen(false);
    displayModalParentAnnounce(openModal);
  };

  return (
    <Dialog
      isOpen={modalOpen}
      onRequestClose={closeModal}
      closeOnOutsideClick
      className={className}
    >
      {children}
    </Dialog>
  );
};

export default FeedbackModal;
