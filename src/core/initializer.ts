import { IntersectionObserverVisualizer } from '.';

export const initializer = () => {
  window.IntersectionObserver = IntersectionObserverVisualizer;
};

declare global {
  interface IntersectionObserverInit {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
    enabled?: boolean;
  }
}
