import styled from 'styled-components';
import { DEFAULT_TAB_OPTIONS } from '../constants';
import { ActiveBottomBar } from './active-bottom-bar';
import { Tab } from './tab';

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

interface TabsProps {
  handleClickTabOption: ({ title }: { title: string }) => void;
  tabOptions: typeof DEFAULT_TAB_OPTIONS;
  activeTabIndex: number;
}

export function Tabs({ activeTabIndex, handleClickTabOption, tabOptions }: TabsProps) {
  return (
    <>
      <Container>
        {tabOptions.map((option, idx) => (
          <Tab
            title={option.title}
            isActive={option.isActive}
            key={idx}
            onClick={handleClickTabOption}
          />
        ))}
      </Container>
      <ActiveBottomBar activeTabIndex={activeTabIndex} />
    </>
  );
}
