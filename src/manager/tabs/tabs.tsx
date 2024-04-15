import styled from 'styled-components';
import { DEFAULT_TAB_OPTIONS } from '../constants';
import { TabType } from '../context/tab';
import { ActiveBottomBar } from './active-bottom-bar';
import { Tab } from './tab';

const Container = styled.div`
  width: 100%;
  overflow: auto;
  height: 40px;
  display: flex;
`;

interface TabsProps {
  handleClickTabOption: ({ title }: { title: TabType }) => void;
  currentTab: TabType;
  activeTabIndex: number;
}

export function Tabs({ handleClickTabOption, currentTab, activeTabIndex }: TabsProps) {
  return (
    <>
      <Container>
        {DEFAULT_TAB_OPTIONS.map((option, idx) => (
          <Tab
            title={option}
            isActive={option === currentTab}
            key={idx}
            onClick={() => handleClickTabOption({ title: option })}
          />
        ))}
      </Container>
      <ActiveBottomBar activeTabIndex={activeTabIndex} />
    </>
  );
}
