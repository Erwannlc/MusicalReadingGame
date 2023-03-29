import type { AnnounceProps, NotePlayed } from "business";

export default function getAnnounceHandler ({
  setGameAnnounce,
  setAnnounceNotePlayed
}: {
  setGameAnnounce: (value: React.SetStateAction<AnnounceProps>) => void
  setAnnounceNotePlayed: (value: React.SetStateAction<NotePlayed>) => void
}) {
  function displayInfo (
    announce: AnnounceProps
  ) {
    setGameAnnounce(announce);
  }

  function displayNotePlayed (
    note: NotePlayed
  ) {
    setAnnounceNotePlayed(note);
  }

  return {
    displayInfo,
    displayNotePlayed
  };
};
