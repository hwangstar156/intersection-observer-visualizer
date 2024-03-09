import { styled } from 'styled-components';
import { Tabs } from './tabs';

const Container = styled.div`
  width: 350px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.black001};
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

export function LeftNavigationBar() {
  return (
    <Container>
      <Tabs />
    </Container>
  );
}
