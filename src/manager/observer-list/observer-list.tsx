import { styled } from 'styled-components';
import { ObserverItem } from './observer-item';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export type ObserverType = Record<
  string,
  Record<string, { rootClassName: string; targetClassName: string }>
>;

interface ObserverListProps {
  list: ObserverType;
}

export function ObserverList({ list }: ObserverListProps) {
  console.log({ list });

  return (
    <>
      {Object.entries(list).map(([key, value], idx) => {
        return (
          <Container key={idx}>
            <ObserverItem title={key} isActive={idx === 0} />
            <>
              {Object.entries(value).map(([key, value]) => {
                return <span>{key}</span>;
              })}
            </>
          </Container>
        );
      })}
    </>
  );
}
