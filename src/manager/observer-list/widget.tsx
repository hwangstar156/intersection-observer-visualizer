import { useObserverList } from '../hooks/use-observer-list';
import { ObserverList } from './observer-list';

export function ObserverListWidget() {
  const { items } = useObserverList();

  return <ObserverList items={items} />;
}
