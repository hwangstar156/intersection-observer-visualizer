import { useTabContext } from '../context/tab';

export function useTabs() {
  const [tabOptions, setTabOptions] = useTabContext();

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
