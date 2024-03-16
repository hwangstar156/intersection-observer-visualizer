import { styled } from 'styled-components';
import { useTabContext } from './context/tab';
import { ObserverListWidget } from './observer-list/widget';
import { ObserverOptionForm } from './observer-option-form/observer-option-form';
import { TabWidget } from './tabs/widget';

const Container = styled.div`
  width: 250px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.black001};
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

export function LeftNavigationBar() {
  const [tabOptions] = useTabContext();

  return (
    <Container>
      <TabWidget />
      {tabOptions[0].isActive ? (
        <ObserverListWidget />
      ) : (
        <>
          <ObserverOptionForm initialValue={0} />
        </>
      )}
    </Container>
  );
}
