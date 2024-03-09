import { useState } from 'react';
import { DEFAULT_TAB_OPTIONS } from '../constants';

export function useTabs() {
  const [tabOptions, setTabOptions] = useState(DEFAULT_TAB_OPTIONS);

  const handleClickTabOption = ({ title }: { title: string }) => {
    setTabOptions((prevTabOptions) => {
      return prevTabOptions.map((option) =>
        option.title === title ? { ...option, isActive: true } : { ...option, isActive: false },
      );
    });
  };

  const activeTabIndex = tabOptions.findIndex((option) => option.isActive);

  return { tabOptions, handleClickTabOption, activeTabIndex };
}
