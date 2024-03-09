import React, { createContext, SetStateAction, useContext, useState } from 'react';
import { DEFAULT_TAB_OPTIONS } from '../constants';

type TabType = typeof DEFAULT_TAB_OPTIONS;

export const TabContext = createContext<[TabType, React.Dispatch<SetStateAction<TabType>>] | null>(
  null,
);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const stateInstance = useState<TabType>(DEFAULT_TAB_OPTIONS);

  return <TabContext.Provider value={stateInstance}>{children}</TabContext.Provider>;
};

export function useTabContext() {
  const value = useContext(TabContext);
  if (value === null) {
    throw new Error('useTabContext should used in TabProvider');
  }

  return value;
}
