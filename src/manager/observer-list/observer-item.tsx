import { css, styled } from 'styled-components';
import { ObserverType } from './observer-list';

const Container = styled.div<{ isActive: boolean }>`
  width: 100%;
  padding-left: 20px;
  color: white;
  font-size: 15px;
  padding: 10px 0 10px 20px;
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
      color: ${theme.colors.black001};

      &:hover {
        filter: none;
      }
    `}
`;

const Emoji = styled.span`
  font-size: 14px;
  margin-right: 16px;
`;

interface ObserverItemProps extends ObserverType {}

export function ObserverItem({ title, isActive }: ObserverItemProps) {
  return (
    <Container isActive={isActive}>
      <Emoji>📜</Emoji>
      {title}
    </Container>
  );
}
