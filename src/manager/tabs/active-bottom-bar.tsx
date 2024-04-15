import { styled } from 'styled-components';

const Container = styled.div<{ activeTabIndex: number }>`
  width: 33%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.primary};

  transform: ${({ activeTabIndex }) => `translate(${activeTabIndex * 100}%, 0px)`};
  transition: transform 0.07s linear;
`;

interface ActiveBottomBarProps {
  activeTabIndex: number;
}

export function ActiveBottomBar({ activeTabIndex }: ActiveBottomBarProps) {
  return <Container activeTabIndex={activeTabIndex} />;
}
