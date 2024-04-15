import { useEffect, useState } from 'react';
import { IdMapType, useIdMapContext } from '../context/idMap';

export interface ObserverListType extends IdMapType {}

export function useObserverList() {
  const [idMap] = useIdMapContext();
  const [observerList, setObserverList] = useState<ObserverListType>({});

  useEffect(() => {
    setObserverList(idMap);
  }, [idMap]);

  const handleClickCurrentPathFolder = (folderName: string) => {
    setObserverList((prev) => {
      const copidPrev = prev;
      copidPrev[folderName].isExpand = !prev[folderName].isExpand;

      return {
        ...copidPrev,
      };
    });
  };

  const handleClickRootFolder = (currentPath: string, folderName: string) => {
    setObserverList((prev) => {
      const copidPrev = prev;
      copidPrev[currentPath].rootObservers[folderName].isExpand =
        !prev[currentPath].rootObservers[folderName].isExpand;

      return {
        ...copidPrev,
      };
    });
  };

  return { observerList: observerList, handleClickCurrentPathFolder, handleClickRootFolder };
}
