const TEST_OBSERVER_LIST = [
  { title: 'test1', isActive: true },
  { title: 'test2', isActive: false },
  { title: 'test3', isActive: false },
  { title: 'test4', isActive: false },
];

export function useObserverList() {
  return { items: TEST_OBSERVER_LIST };
}
