import React, { createContext, SetStateAction, useContext, useState } from 'react';
import { DEFAULT_TAB_OPTIONS } from '../constants';

export type TabType = (typeof DEFAULT_TAB_OPTIONS)[number];

export const TabContext = createContext<[TabType, React.Dispatch<SetStateAction<TabType>>] | null>(
  null,
);

export const CurrentTabProvider = ({ children }: { children: React.ReactNode }) => {
  const stateInstance = useState<TabType>('CATEGORY');

  return <TabContext.Provider value={stateInstance}>{children}</TabContext.Provider>;
};

export function useCurrentTabContext() {
  const value = useContext(TabContext);
  if (value === null) {
    throw new Error('useCurrentTabContext should used in CurrentTabProvider');
  }

  return value;
}
