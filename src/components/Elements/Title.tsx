import type { ReactNode } from "react";

type SizeType = keyof typeof sizes;
const sizes = {
  medium: "text-2xl mb-3",
  large: "text-3xl mb-6",
  extraLarge: "text-5xl mb-8",
};

export default function Title({
  children,
  size = "large",
  className,
}: {
  children: ReactNode;
  size?: SizeType;
  className?: string;
}) {
  return (
    <h1 className={`${sizes[size]} ${className} font-bold`}>{children}</h1>
  );
}
