import React, { useEffect } from "react";

const useHandleClickOutsidePanel = (
  panelRef: React.RefObject<HTMLDivElement>,
  setIsPanelOpen: (open: boolean) => void,
  setSelectedText: (text: string) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsPanelOpen(false);
        setSelectedText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPanelOpen, setSelectedText, panelRef]);
};

export default useHandleClickOutsidePanel;

