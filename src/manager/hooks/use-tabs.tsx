import { TabType, useCurrentTabContext } from '../context/tab';

export function useTabs() {
  const [currentTab, setCurrentTab] = useCurrentTabContext();

  const handleClickTabOption = ({ title }: { title: TabType }) => {
    setCurrentTab(title);
  };

  return { currentTab, handleClickTabOption };
}
