import { styled } from 'styled-components';
import { ObserverListType } from '../hooks/use-observer-list';
import { ObserverItem } from './observer-item';
import { ObserverRootItem } from './observer-root-item';
import { ObserverTargetItem } from './observer-target-item';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface ObserverListProps {
  list: ObserverListType;
  currentId: string | null;
  onClickCurrentPathFolder: (folderName: string) => void;
  onClickRootFolder: (currentPath: string, folderName: string) => void;
  onChangeCurrentId: (id: string) => void;
}

export function ObserverList({
  list,
  onClickCurrentPathFolder,
  onClickRootFolder,
  onChangeCurrentId,
  currentId,
}: ObserverListProps) {
  return (
    <>
      {Object.entries(list).map(([currentPath, value], idx) => {
        return (
          <Container key={idx}>
            <ObserverItem
              title={currentPath}
              isActive={value.isExpand}
              onClickFolder={onClickCurrentPathFolder}
            />
            {value.isExpand ? (
              <>
                {value.rootObservers &&
                  Object.entries(value.rootObservers).map(([root, value]) => {
                    return (
                      <>
                        <ObserverRootItem
                          key={root}
                          title={root}
                          isActive={value.isExpand}
                          currentPath={currentPath}
                          onClickRootFolder={onClickRootFolder}
                        />
                        {value.isExpand ? (
                          <>
                            {value.targetObservers &&
                              Object.entries(value.targetObservers).map(([target, value]) => {
                                const targetKey = `${root}-${target}`;

                                return (
                                  <ObserverTargetItem
                                    key={targetKey}
                                    title={targetKey}
                                    isActive={currentId === targetKey}
                                    onChangeCurrentId={onChangeCurrentId}
                                  />
                                );
                              })}
                          </>
                        ) : null}
                      </>
                    );
                  })}
              </>
            ) : null}
          </Container>
        );
      })}
    </>
  );
}
