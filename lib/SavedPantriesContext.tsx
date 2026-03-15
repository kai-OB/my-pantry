'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

const STORAGE_KEY = 'my-pantry-saved';

interface SavedContextValue {
  savedIds: Set<string>;
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  hydrated: boolean;
}

const SavedContext = createContext<SavedContextValue>({
  savedIds: new Set(),
  toggleSave: () => {},
  isSaved: () => false,
  hydrated: false,
});

export function SavedPantriesProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedIds(new Set(JSON.parse(stored)));
    } catch {}
    setHydrated(true);
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedIds.has(id), [savedIds]);

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isSaved, hydrated }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSavedPantries() {
  return useContext(SavedContext);
}
