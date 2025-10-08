import type { ReactNode } from "react";
import Icon from "./Icon";
type VariantType = keyof typeof colors;
type SizeType = keyof typeof sizes;
type PaddingType = keyof typeof paddings;

type ButtonType = {
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: any;
  variant?: VariantType;
  className?: string;
  isLoading?: boolean;
  size?: SizeType;
  padding?: PaddingType;
  disabled?: boolean;
};

const colors = {
  primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
  danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-300",
  warning: "text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300",
  white:
    "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100",
  dark: "text-white bg-gray-900 border border-gray-200 hover:bg-gray-200 hover:text-gray-900 focus:ring-gray-100",
};

const sizes = {
  small: "w-20",
  medium: "w-30",
  large: "w-40",
};

const paddings = {
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
  size,
  padding,
  disabled = false,
}: ButtonType) => {
  return (
    <button
      disabled={isLoading || disabled}
      type={type}
      onClick={onClick}
      className={`${
        isLoading || disabled
          ? "bg-slate-300"
          : colors[variant] + " cursor-pointer"
      } ${className} ${size && sizes[size]} ${
        padding && paddings[padding]
      } focus:ring-2 h-10 focus:outline-none font-medium rounded-lg flex items-center justify-center`}
    >
      {isLoading ? <Icon icon="loading" size={20} /> : children}
    </button>
  );
};

export default Button;
