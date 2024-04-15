import styled, { css } from 'styled-components';

const Container = styled.div<{ isActive: boolean }>`
  width: 50%;
  height: 40px;
  background: ${({ theme }) => theme.colors.black001};
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ isActive, theme }) =>
    isActive &&
    css`
      color: ${theme.colors.primary};
    `}
`;

interface TabProps {
  title: string;
  isActive: boolean;
  onClick: ({ title }: { title: string }) => void;
}

export function Tab({ title, isActive, onClick }: TabProps) {
  return (
    <Container isActive={isActive} onClick={() => onClick({ title })}>
      {title}
    </Container>
  );
}
