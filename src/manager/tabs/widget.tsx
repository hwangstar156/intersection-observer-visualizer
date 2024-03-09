import { useTabs } from '../hooks/use-tabs';
import { Tabs } from './tabs';

export function TabWidget() {
  const { activeTabIndex, handleClickTabOption, tabOptions } = useTabs();

  return (
    <Tabs
      activeTabIndex={activeTabIndex}
      handleClickTabOption={handleClickTabOption}
      tabOptions={tabOptions}
    />
  );
}
