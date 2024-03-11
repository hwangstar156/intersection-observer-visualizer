import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '10px')};
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius}px` : '10px')};
  padding: 5px;
  outline: none;
  cursor: pointer;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-color: transparent;

  &:hover {
    filter: brightness(1.05);
  }
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  margin-top: 2.4rem;
  padding: 0 1.2rem;
  font-size: 14px;
`;

export function Button({ children, ...args }: ButtonProps) {
  return (
    <Container>
      <StyledButton {...args}>{children}</StyledButton>
    </Container>
  );
}
