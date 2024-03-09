import { useState } from 'react';
import styled from 'styled-components';
import { ActiveBottomBar } from './active-bottom-bar';
import { Tab } from './tab';

const DEFAULT_TAB_OPTIONS = [
  {
    title: 'CATEGORY',
    isActive: true,
  },
  {
    title: 'OPTIONS',
    isActive: false,
  },
];

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
`;

export function Tabs() {
  const { handleClickTabOption, tabOptions, activeTabIndex } = useTabs();

  return (
    <>
      <Container>
        {tabOptions.map((option) => (
          <Tab title={option.title} isActive={option.isActive} onClick={handleClickTabOption} />
        ))}
      </Container>
      <ActiveBottomBar activeTabIndex={activeTabIndex} />
    </>
  );
}

function useTabs() {
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
