import React, { createContext, SetStateAction, useContext, useState } from 'react';

type CurrentIdType = string | null;

export const CurrentIdContext = createContext<
  [CurrentIdType, React.Dispatch<SetStateAction<CurrentIdType>>] | null
>(null);

export const CurrentIdProvider = ({ children }: { children: React.ReactNode }) => {
  const stateInstance = useState<CurrentIdType>(null);

  return <CurrentIdContext.Provider value={stateInstance}>{children}</CurrentIdContext.Provider>;
};

export function useCurrentId() {
  const value = useContext(CurrentIdContext);
  if (value === null) {
    throw new Error('CurrentIdContext should used in CurrentIdProvider');
  }

  return value;
}
