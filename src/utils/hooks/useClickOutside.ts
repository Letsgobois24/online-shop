import { RefObject, useEffect } from "react";

const useClickOutside = (
  onClose: () => void,
  ref: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);
};

export default useClickOutside;
