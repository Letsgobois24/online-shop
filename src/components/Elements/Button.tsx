import type { ReactNode } from "react";
import Icon from "./Icon";
type VariantType = keyof typeof colors;
type SizeType = keyof typeof sizes;

type ButtonType = {
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: any;
  variant?: VariantType;
  className?: string;
  isLoading?: boolean;
  size?: SizeType;
};

const colors = {
  primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
  danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-300",
  white:
    "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100",
};

const sizes = {
  small: "px-1.5 py-1.5",
  medium: "px-4 py-2.5",
};

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className,
  isLoading = false,
  size = "medium",
}: ButtonType) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        isLoading ? "bg-slate-300" : colors[variant] + " cursor-pointer"
      } ${className} ${
        sizes[size]
      } focus:ring-2 focus:outline-none font-medium rounded-lg flex items-center justify-center`}
    >
      {isLoading ? <Icon icon="loading" size={20} /> : children}
    </button>
  );
};

export default Button;
