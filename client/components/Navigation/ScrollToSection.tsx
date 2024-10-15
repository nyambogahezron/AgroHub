import React from 'react';
type ScrollToSectionProps = {
  sectionId: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ScrollToSection({
  sectionId,
  setOpen,
}: ScrollToSectionProps) {
  const sectionElement = document.getElementById(sectionId);

  if (sectionElement) {
    const targetScroll = sectionElement.offsetTop - 128;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
    if (setOpen) {
      setOpen(false);
    }
  }
}
