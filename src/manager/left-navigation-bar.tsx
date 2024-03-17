import { styled } from 'styled-components';
import { useTabContext } from './context/tab';
import { ObserverListWidget } from './observer-list/widget';
import { ObserverRootOptionButton } from './observer-option-form/observer-root-option-button';
import { RootMarginForm } from './observer-option-form/root-margin-form';
import { ThresholdForm } from './observer-option-form/threshold-form';
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

const OptionFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.3rem;
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
          <OptionFormContainer>
            <ObserverRootOptionButton />
            <RootMarginForm />
            <ThresholdForm />
          </OptionFormContainer>
        </>
      )}
    </Container>
  );
}
