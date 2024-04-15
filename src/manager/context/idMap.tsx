import React, { createContext, SetStateAction, useContext, useState } from 'react';

interface IdMapValue {
  rootClassName: string | null;
  targetId: string;
}

export type IdMapType = {
  [key: string]: {
    rootObservers: Root;
    isExpand: boolean;
  };
};

type Root = {
  [key: string]: {
    targetObservers: Target;
    isExpand: boolean;
  };
};

export type Target = {
  [key: string]: {
    rootClassName: string | null;
    targetId: string;
    threshold: IntersectionObserverInit['threshold'];
    rootMargin: IntersectionObserverInit['rootMargin'];
  };
};

export const IdMapContext = createContext<
  [IdMapType, React.Dispatch<SetStateAction<IdMapType>>] | null
>(null);

export const IdMapProvider = ({ children }: { children: React.ReactNode }) => {
  const stateInstance = useState<IdMapType>({});

  return <IdMapContext.Provider value={stateInstance}>{children}</IdMapContext.Provider>;
};

export function useIdMapContext() {
  const value = useContext(IdMapContext);
  if (value === null) {
    throw new Error('useIdMapContext should used in IdMapProvider');
  }

  return value;
}
