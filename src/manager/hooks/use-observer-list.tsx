import { useIdMapContext } from '../context/idMap';

const TEST_OBSERVER_LIST = {
  '/rentacar': {
    'iov-0': {
      rootClassName: 'test',
      targetClassName: 'test1',
    },
    'iov-1': {
      rootClassName: 'test2',
      targetClassName: 'test3',
    },
  },
  '/rentacar/search': {
    'iov-2': {
      rootClassName: 'test4',
      targetClassName: 'test5',
    },
    'iov-3': {
      rootClassName: 'test6',
      targetClassName: 'test7',
    },
  },
};

export function useObserverList() {
  const [idMap] = useIdMapContext();

  const observerList = Object.entries(idMap).reduce(
    (acc: { [key: string]: object }, [key, value]) => {
      // key는 id이고, value의 currentPath가 key가 될거임

      return {
        ...acc,
        [value.currentPath]: {
          ...acc[value.currentPath],
          [key]: {
            rootClassName: value.rootClassName,
            targetClassName: value.targetClassName,
          },
        },
      };
    },
    {},
  ) as Record<string, Record<string, 'rootClassName' | 'targetClassName'>>;

  return { observerList: TEST_OBSERVER_LIST };
}
