import { useRef, useEffect } from "react";
import type { FC, MouseEvent, TouchEvent } from "react";
import { CloseButton } from "components/UI";
// import "./dialog.scss";

// thx to https://codesandbox.io/u/souporserious
// https://souporserious.com/build-a-dialog-component-in-react/
interface Props {
  children: React.ReactNode
  isOpen: boolean
  onRequestClose: () => void
  closeOnOutsideClick: boolean
  className: string
};

const Dialog: FC<Props> = ({
  children,
  isOpen,
  onRequestClose,
  closeOnOutsideClick,
  className
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      if (isOpen) {
        dialogNode.showModal();
      } else {
        dialogNode.close();
      };
    };
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    onRequestClose();
  };

  function handleOutsideClick (event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (closeOnOutsideClick && event.target === dialogRef.current) {
      onRequestClose();
    };
  }

  const dialogClassName = "modal " + className;

  return (
    <dialog
      ref={dialogRef}
      className={dialogClassName}
      onClick={handleOutsideClick}
      onCancel={(e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
        handleCancel(e);
      }}>
        {children}
      <CloseButton
       handleClose={onRequestClose}
       className="close-modal"
       />
    </dialog>
  );
};

export default Dialog;
