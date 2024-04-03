import { useObserverList } from '../hooks/use-observer-list';
import { ObserverList } from './observer-list';

export function ObserverListWidget() {
  const { observerList, handleClickFolder } = useObserverList();

  return <ObserverList list={observerList} onClickFolder={handleClickFolder} />;
}
