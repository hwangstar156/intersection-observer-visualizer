import { useEffect } from 'react';
import { useObserverList } from '../hooks/use-observer-list';
import { ObserverList } from './observer-list';

export function ObserverListWidget() {
  const { observerList } = useObserverList();

  useEffect(() => {
    console.log('observerList', observerList);
  }, [observerList]);

  return <ObserverList list={observerList} />;
}
