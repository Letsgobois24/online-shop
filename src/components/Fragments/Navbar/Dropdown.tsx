import useClickOutside from "@/utils/hooks/useClickOutside";
import { Dispatch, SetStateAction, useRef } from "react";

type PropsType = {
  dropDown: boolean;
  setDropDown: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function Dropdown({
  dropDown,
  setDropDown,
  children,
}: PropsType) {
  const onClose = () => setDropDown(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(onClose, ref);

  return (
    <div
      ref={ref}
      className={`${
        dropDown ? "scale-100" : "scale-0"
      } absolute z-10 bg-gray-50 right-2 mt-5 rounded-sm border border-gray-300 transition duration-100 origin-top-right`}
    >
      {/* Dropdown */}
      {children}
    </div>
  );
}
