import { styled } from 'styled-components';
import { ObserverListType } from '../hooks/use-observer-list';
import { ObserverItem } from './observer-item';
import { ObserverSubItem } from './observer-sub-item';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface ObserverListProps {
  list: ObserverListType;
  onClickFolder: (folderName: string) => void;
}

export function ObserverList({ list, onClickFolder }: ObserverListProps) {
  return (
    <>
      {Object.entries(list).map(([key, value], idx) => {
        return (
          <Container key={idx}>
            <ObserverItem title={key} isActive={value.isExpand} onClickFolder={onClickFolder} />
            {value.isExpand ? (
              <>
                {Object.entries(value.observers).map(([key, value]) => {
                  return <ObserverSubItem title={key} />;
                })}
              </>
            ) : null}
          </Container>
        );
      })}
    </>
  );
}
