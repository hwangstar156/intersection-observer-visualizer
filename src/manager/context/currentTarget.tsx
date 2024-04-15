import { useEffect, useState } from 'react';
import { useCurrentId } from './currentId';
import { Target, useIdMapContext } from './idMap';

export function useCurrentTarget() {
  const [idMap] = useIdMapContext();
  const [currentId] = useCurrentId();

  const [currentTarget, setCurrentTarget] = useState<Target[string] | null>(null);

  useEffect(() => {
    for (const currentPathKey in idMap) {
      const rootObservers = idMap[currentPathKey].rootObservers;
      for (const rootKey in rootObservers) {
        const targetObservers = idMap[currentPathKey].rootObservers[rootKey].targetObservers;
        for (const targetKey in targetObservers) {
          if (targetObservers[targetKey].targetId === currentId) {
            setCurrentTarget(targetObservers[targetKey]);
          }
        }
      }
    }
  }, [idMap, currentId]);

  return { currentTarget };
}
