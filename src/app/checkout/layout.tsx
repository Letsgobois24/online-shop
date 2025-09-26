import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="px-4 py-6">{children}</div>;
}
