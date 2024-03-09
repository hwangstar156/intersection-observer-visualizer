import styled from 'styled-components';
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
  return (
    <Container>
      {DEFAULT_TAB_OPTIONS.map((option) => (
        <Tab text={option.title} isActive={option.isActive} />
      ))}
    </Container>
  );
}
