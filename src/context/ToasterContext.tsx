import { createContext, useContext, useEffect, useState } from "react";
import type {
  ToasterProps,
  VariantsType,
} from "@/components/Fragments/Toaster";
import Toaster from "@/components/Fragments/Toaster";

type ToasterContextType = {
  showToaster: (variant: VariantsType, message: string) => void;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [toaster, setToaster] = useState<Omit<ToasterProps, "onClose"> | null>(
    null
  );

  const showToaster = (variant: VariantsType, message: string) => {
    setToaster({ variant, message });
  };

  useEffect(() => {
    if (toaster) {
      setTimeout(() => {
        setToaster(null);
      }, 1000);
    }
  }, [toaster]);

  return (
    <ToasterContext.Provider value={{ showToaster }}>
      {children}
      {toaster && (
        <Toaster
          variant={toaster.variant}
          message={toaster.message}
          onClose={() => setToaster(null)}
        />
      )}
    </ToasterContext.Provider>
  );
}

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
};
