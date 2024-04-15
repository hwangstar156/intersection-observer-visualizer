import styled, { css } from 'styled-components';

const Container = styled.div<{ isActive: boolean }>`
  width: 100%;
  color: white;
  font-size: 14px;
  padding: 5px 0 5px 60px;
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.black001};

  &:hover {
    filter: brightness(1.3);
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.colors.primary};
      font-weight: 700;
      width: 100%;
      height: 100%;

      &:hover {
        filter: none;
      }
    `}
`;

interface ObserverTargetItemProps {
  title: string;
  isActive: boolean;
  onChangeCurrentId: (id: string) => void;
}

export function ObserverTargetItem({
  title,
  isActive,
  onChangeCurrentId,
}: ObserverTargetItemProps) {
  return (
    <Container isActive={isActive} onClick={() => onChangeCurrentId(title)}>
      {title}
    </Container>
  );
}
