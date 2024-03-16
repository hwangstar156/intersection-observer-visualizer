import { styled } from 'styled-components';
import { useTabContext } from './context/tab';
import { ObserverListWidget } from './observer-list/widget';
import {
  ObserverOptionForm,
  ThresholdOptionForm,
} from './observer-option-form/observer-option-form';
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: space-between;
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
          <FormContainer>
            <ObserverOptionForm initialValue={0} label="top" />
            <ObserverOptionForm initialValue={0} label="left" />
            <ObserverOptionForm initialValue={0} label="right" />
            <ObserverOptionForm initialValue={0} label="bottom" />
          </FormContainer>
          <ThresholdOptionForm initialValue={0} label="threshold" />
        </>
      )}
    </Container>
  );
}
