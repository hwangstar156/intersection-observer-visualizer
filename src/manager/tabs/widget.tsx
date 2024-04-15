import { DEFAULT_TAB_OPTIONS } from '../constants';
import { useTabs } from '../hooks/use-tabs';
import { Tabs } from './tabs';

export function TabWidget() {
  const { currentTab, handleClickTabOption } = useTabs();

  const activeTabIndex = DEFAULT_TAB_OPTIONS.findIndex((option) => option === currentTab);

  return (
    <Tabs
      currentTab={currentTab}
      activeTabIndex={activeTabIndex}
      handleClickTabOption={handleClickTabOption}
    />
  );
}
