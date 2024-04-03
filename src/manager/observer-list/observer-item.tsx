import { css, styled } from 'styled-components';

const Container = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  color: white;
  font-size: 15px;
  padding: 7px 0 7px 10px;
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.black001};
  position: relative;
  margin-bottom: 2px;
  z-index: 2;

  /* &:hover {
    filter: brightness(1.3);
  } */

  ${({ isActive, theme }) =>
    isActive &&
    css`
      &::after {
        content: 'before';
        position: absolute;
        display: block;
        top: 0px;
        right: 0px;
        color: transparent;
        width: 100%;
        background-color: #111;
        padding: 7px 0 7px 0px;
        border: 1px solid ${theme.colors.primary};
        opacity: 0.8;
        z-index: -1;
      }
      color: ${theme.colors.primary};
      &:hover {
        filter: none;
      }
    `}
`;

const Emoji = styled.span`
  font-size: 14px;
  margin-right: 6px;
`;

interface ObserverItemProps {
  title: string;
  isActive: boolean;
  onClickFolder: (folderName: string) => void;
}

export function ObserverItem({ title, isActive, onClickFolder }: ObserverItemProps) {
  const arrowSrc = isActive ? '/expand_more_arrow.svg' : '/navigate_next_arrow.svg';
  const folderSrc = isActive ? '/folder-open.svg' : '/folder.svg';

  return (
    <Container isActive={isActive} onClick={() => onClickFolder(title)}>
      <img src={arrowSrc} width={18} height={18} />
      <Emoji>
        <img src={folderSrc} width={15} height={15} />
      </Emoji>
      <>{title}</>
    </Container>
  );
}
