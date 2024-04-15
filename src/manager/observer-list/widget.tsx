import { useCurrentId } from '../context/currentId';
import { useObserverList } from '../hooks/use-observer-list';
import { ObserverList } from './observer-list';

export function ObserverListWidget() {
  const { observerList, handleClickCurrentPathFolder, handleClickRootFolder } = useObserverList();
  const [currentId, setCurrentId] = useCurrentId();

  const handleChangeCurrentId = (id: string) => {
    setCurrentId(id);
  };

  return (
    <ObserverList
      currentId={currentId}
      list={observerList}
      onClickCurrentPathFolder={handleClickCurrentPathFolder}
      onClickRootFolder={handleClickRootFolder}
      onChangeCurrentId={handleChangeCurrentId}
    />
  );
}
