import React, { createContext, SetStateAction, useContext, useState } from 'react';

export const ToggleContext = createContext<
  [boolean, React.Dispatch<SetStateAction<boolean>>] | null
>(null);

export const ToggleProvider = ({ children }: { children: React.ReactNode }) => {
  const stateInstance = useState<boolean>(true);

  return <ToggleContext.Provider value={stateInstance}>{children}</ToggleContext.Provider>;
};

export function useToggleContext() {
  const value = useContext(ToggleContext);
  if (value === null) {
    throw new Error('useToggleContext should used in ToggleProvider');
  }

  return value;
}
