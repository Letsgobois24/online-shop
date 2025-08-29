import type { ReactNode } from "react";

export default function Alert({ children }: { children: ReactNode }) {
  return (
    <div
      className=" p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      {children}
    </div>
  );
}
