import styled from 'styled-components';
import { Button } from '../../common/button';
import { Label } from '../../common/label';
import { theme } from '../../styles/theme';
import { useCurrentTarget } from '../context/currentTarget';
import { ActiveButton } from './active-button';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

export function ObserverControlsForm() {
  const { currentTarget } = useCurrentTarget();

  return (
    <>
      <FormContainer>
        <Label fontSize={20} color={'#fff'}>
          current-target
        </Label>
        <Button
          backgroundColor={'#fff'}
          borderRadius={6}
          height={40}
          color={theme.colors.primary}
          borderColor={theme.colors.primary}
        >
          {currentTarget?.targetId}
        </Button>
      </FormContainer>

      <FormContainer>
        <Label fontSize={20} color={'#fff'}>
          root
        </Label>
        <Button
          backgroundColor={'#fff'}
          borderRadius={6}
          height={40}
          color={theme.colors.primary}
          borderColor={theme.colors.primary}
        >
          {currentTarget?.rootClassName === null ? 'null(browser)' : currentTarget?.rootClassName}
        </Button>
      </FormContainer>
      <ActiveButton />
    </>
  );
}
