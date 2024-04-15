import { useCurrentTarget } from '../context/currentTarget';

export function ObserverControlsForm() {
  const { currentTarget } = useCurrentTarget();

  return (
    <>
      <div>{currentTarget?.rootClassName}</div>
      <div>{currentTarget?.rootMargin}</div>
      <div>{currentTarget?.targetId}</div>
      <div>{currentTarget?.threshold}</div>
    </>
  );
}
