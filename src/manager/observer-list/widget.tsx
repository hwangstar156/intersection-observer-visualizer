import { useCurrentId } from '../context/currentId';
import { useObserverList } from '../hooks/use-observer-list';
import { ObserverList } from './observer-list';

export function ObserverListWidget() {
  const { observerList, handleClickFolder } = useObserverList();
  const [currentId, setCurrentId] = useCurrentId();

  const handleChangeCurrentId = (id: string) => {
    setCurrentId(id);
  };

  return (
    <ObserverList
      currentId={currentId}
      list={observerList}
      onClickFolder={handleClickFolder}
      onChangeCurrentId={handleChangeCurrentId}
    />
  );
}
