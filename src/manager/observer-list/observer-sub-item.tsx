import styled, { css } from 'styled-components';

const Container = styled.div<{ isActive: boolean }>`
  width: 100%;
  color: white;
  font-size: 14px;
  padding: 5px 0 5px 40px;
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.black001};

  &:hover {
    filter: brightness(1.3);
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      &::before {
        content: '';
        background-color: ${theme.colors.primary};
        color: ${theme.colors.black001};
        width: 100%;
        height: 100%;
        opacity: 0.6;
        border: 1px solid #0067a3;
      }

      &:hover {
        filter: none;
      }
    `}
`;

interface ObserverSubItemProps {
  title: string;
  isActive: boolean;
}

export function ObserverSubItem({ title, isActive }: ObserverSubItemProps) {
  return <Container isActive={isActive}>{title}</Container>;
}
