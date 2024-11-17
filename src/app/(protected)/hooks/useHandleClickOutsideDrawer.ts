import { useEffect } from "react";

const useHandleClickOutsideDrawer = () => {
  useEffect(() => {
    const handleClickOutside = () => {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};

export default useHandleClickOutsideDrawer;

