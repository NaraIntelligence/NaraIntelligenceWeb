"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { COPY, DEFAULT_LANG, type Copy, type Lang } from "./copy";

const STORAGE_KEY = "nara-lang";

/* --------------------------------------------------------------------------
 * Language store
 *
 * The choice lives outside React so it can be read straight from
 * localStorage on the client while the server always renders the default
 * (English). `useSyncExternalStore` is what reconciles the two: it hydrates
 * against the server snapshot, then re-renders with the stored preference.
 * ------------------------------------------------------------------------ */

const listeners = new Set<() => void>();
let current: Lang | null = null;

function read(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") return stored;
  } catch {
    /* storage unavailable (private mode, blocked cookies) */
  }
  return DEFAULT_LANG;
}

function getSnapshot(): Lang {
  if (current === null) current = read();
  return current;
}

function getServerSnapshot(): Lang {
  return DEFAULT_LANG;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function write(next: Lang) {
  if (current === next) return;
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* the choice still applies for this session */
  }
  listeners.forEach((listener) => listener());
}

/* ------------------------------------------------------------------------ */

type LangContextValue = {
  lang: Lang;
  t: Copy;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => write(next), []);

  const value = useMemo(
    () => ({ lang, t: COPY[lang], setLang }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
