import { useImperativeHandle, useRef } from "react";
import Icon from "../../Elements/Icon";
import useClickOutside from "@/utils/hooks/useClickOutside";

const Modal = ({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(onClose, ref);

  return (
    <div className="flex justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50 bg-black/50">
      <div className="relative py-4 w-full max-w-xl max-h-full">
        <div
          ref={ref}
          className="relative bg-white rounded-lg shadow-sm max-h-[90vh] overflow-y-auto"
        >
          {title && (
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                type="button"
                className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <Icon icon="cross" size={12} />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
