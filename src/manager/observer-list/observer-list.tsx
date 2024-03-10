import { styled } from 'styled-components';
import { ObserverItem } from './observer-item';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export type ObserverType = { title: string; isActive: boolean };

interface ObserverListProps {
  items: ObserverType[];
}

export function ObserverList({ items }: ObserverListProps) {
  return (
    <Container>
      {items.map((item, idx) => (
        <ObserverItem {...item} key={idx} />
      ))}
    </Container>
  );
}
