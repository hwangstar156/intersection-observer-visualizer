import styled from 'styled-components';
import { Button } from '../../common/button';
import { theme } from '../../styles/theme';

const Container = styled.div`
  margin-top: auto;
`;

export function ActiveButton() {
  return (
    <Container>
      <Button backgroundColor={theme.colors.primary} borderRadius={6} height={40} type="submit">
        Active
      </Button>
    </Container>
  );
}
