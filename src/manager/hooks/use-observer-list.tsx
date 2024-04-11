import { useEffect, useState } from 'react';
import { useIdMapContext } from '../context/idMap';

export interface ObserverListType {
  [key: string]: {
    observers: Record<string, Record<'rootClassName' | 'targetClassName', string>>;
    isExpand: boolean;
  };
}

const TEST_OBSERVER_LIST: ObserverListType = {
  '/rentacar': {
    observers: {
      'iov-0': {
        rootClassName: 'test',
        targetClassName: 'test1',
      },
      'iov-1': {
        rootClassName: 'test2',
        targetClassName: 'test3',
      },
    },
    isExpand: true,
  },
  '/rentacar/search': {
    observers: {
      'iov-2': {
        rootClassName: 'test4',
        targetClassName: 'test5',
      },
      'iov-3': {
        rootClassName: 'test6',
        targetClassName: 'test7',
      },
    },
    isExpand: false,
  },
};

export function useObserverList() {
  const [idMap] = useIdMapContext();
  const [observerList, setObserverList] = useState<ObserverListType>({});

  console.log(observerList);

  useEffect(() => {
    const observerList = Object.entries(idMap).reduce(
      (acc: { [key: string]: { observers: object; isExpand: boolean } }, [key, value]) => {
        // key는 id이고, value의 currentPath가 key가 될거임

        return {
          ...acc,
          [value.currentPath]: {
            observers: {
              ...acc[value.currentPath]?.['observers'],
              [key]: {
                rootClassName: value.rootClassName,
                targetClassName: value.targetClassName,
              },
            },
            isExpand: false,
          },
        };
      },
      {},
    ) as ObserverListType;

    setObserverList(observerList);
  }, [idMap]);

  const handleClickFolder = (folderName: string) => {
    setObserverList((prev) => {
      const copidPrev = prev;
      copidPrev[folderName].isExpand = !prev[folderName].isExpand;

      return {
        ...copidPrev,
      };
    });
  };

  return { observerList: observerList, handleClickFolder };
}
