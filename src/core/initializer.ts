import { IntersectionObserverVisualizer } from '.';

interface InitializerParams {
  allEnabled?: boolean;
}

export const initializer = ({ allEnabled }: InitializerParams) => {
  window.IntersectionObserver = IntersectionObserverVisualizer;
  window.__IOV_ALL_ENABLED__ = allEnabled;
};

declare global {
  interface IntersectionObserverInit {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
    enabled?: boolean;
  }

  interface Window {
    __IOV_ALL_ENABLED__?: boolean;
  }
}
