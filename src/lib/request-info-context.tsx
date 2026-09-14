"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type RequestInfoContextValue = {
  isOpen: boolean;
  /** Agent the visitor came from, so the form can say "Hire Diego". */
  agentName: string | null;
  open: (agentName?: string) => void;
  close: () => void;
};

const RequestInfoContext = createContext<RequestInfoContextValue | null>(null);

export function RequestInfoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [agentName, setAgentName] = useState<string | null>(null);

  const open = useCallback((name?: string) => {
    setAgentName(name ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, agentName, open, close }),
    [isOpen, agentName, open, close],
  );

  return (
    <RequestInfoContext.Provider value={value}>
      {children}
    </RequestInfoContext.Provider>
  );
}

export function useRequestInfo() {
  const ctx = useContext(RequestInfoContext);
  if (!ctx)
    throw new Error("useRequestInfo must be used inside <RequestInfoProvider>");
  return ctx;
}
