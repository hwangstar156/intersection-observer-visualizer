import styled, { css } from 'styled-components';

const Container = styled.div<{ isActive: boolean }>`
  width: 50%;
  height: 70px;
  background: ${({ theme }) => theme.colors.black001};
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ isActive, theme }) =>
    isActive &&
    css`
      border-bottom: 2px solid ${theme.colors.primary};
    `}
`;

interface TabProps {
  text: string;
  isActive: boolean;
}

export function Tab({ text, isActive }: TabProps) {
  return <Container isActive={isActive}>{text}</Container>;
}
