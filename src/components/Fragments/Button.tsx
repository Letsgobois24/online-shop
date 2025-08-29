import type { ReactNode } from "react";

type ButtonType = {
  children: ReactNode;
  type: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  isLoading?: boolean;
};

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className,
  isLoading = false,
}: ButtonType) => {
  const colors = {
    primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
    secondary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        isLoading ? "bg-slate-300" : colors[variant]
      } ${className} cursor-pointer text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
