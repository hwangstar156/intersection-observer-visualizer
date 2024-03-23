import { IntersectionObserverVisualizer } from '.';

export const initializer = () => {
  window.IntersectionObserver = IntersectionObserverVisualizer;
};
