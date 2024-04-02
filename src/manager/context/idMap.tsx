import React, { createContext, SetStateAction, useContext, useState } from 'react';

interface IdMapValue {
  rootClassName: string | null;
  targetClassName: string;
  currentPath: string;
}

type IdMapType = Record<string, IdMapValue>;

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
