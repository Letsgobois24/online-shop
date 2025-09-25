import { SessionProvider } from "next-auth/react";
import { ToasterProvider } from "@/context/ToasterContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ToasterProvider>{children}</ToasterProvider>
    </SessionProvider>
  );
}
