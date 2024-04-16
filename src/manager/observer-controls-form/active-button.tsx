import styled, { css } from 'styled-components';
import { Button } from '../../common/button';
import { theme } from '../../styles/theme';

const Container = styled.div<{ isChecked: boolean }>`
  margin-top: auto;

  opacity: 1;
  transform: translateZ(0);

  transition: all 0.5s;
  position: relative;
  z-index: 0;

  ${({ isChecked }) =>
    isChecked &&
    css`
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    `};
`;

interface ActiveButtonProps {
  isChecked: boolean;
}

export function ActiveButton({ isChecked }: ActiveButtonProps) {
  return (
    <Container isChecked={isChecked}>
      <Button backgroundColor={theme.colors.primary} borderRadius={6} height={40} type="submit">
        Active Permanently
      </Button>
    </Container>
  );
}
