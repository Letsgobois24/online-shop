import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type PropsType = {
  isSidebar: boolean;
  setIsSidebar: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const SidebarTemplate = ({ isSidebar, setIsSidebar, children }: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside sidebar
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsSidebar(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 640) {
        document.removeEventListener("click", handleClickOutside);
      } else {
        document.addEventListener("click", handleClickOutside);
      }
    };
    window.addEventListener("resize", handleResize);

    if (window.innerWidth <= 640) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebar]);

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsSidebar(false);
    }
  }, []);

  return (
    <div
      className={`${
        !isSidebar ? "pointer-events-none" : "bg-black/50"
      } w-full sm:w-side flex fixed top-0 z-20`}
    >
      {/* Sidebar */}
      <aside
        ref={ref}
        className={`${
          !isSidebar && "-translate-x-64"
        } bg-blue-900 w-side text-white font-sans h-screen flex-col transition duration-300 px-3 sm:px-6`}
      >
        {children}
      </aside>
    </div>
  );
};

export default SidebarTemplate;
