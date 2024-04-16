import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  color: white;
  font-size: 15px;
  text-align: center;
`;

export function EmptyTargetForm() {
  return (
    <Container>
      <img src="/close-delete-remove-trash-svgrepo-com.svg" width={40} height={40} />
      <Text>
        First, select a target in the <span style={{ color: theme.colors.primary }}>CATEGORY</span>{' '}
        tab.
      </Text>
    </Container>
  );
}
