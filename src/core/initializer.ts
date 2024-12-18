import { on } from '../util/custom-event';
import { IntersectionObserverVisualizerWrapper } from './wrapper';

interface InitializerParams {
  allEnabled?: boolean;
}

export const initializer = ({ allEnabled }: InitializerParams) => {
  window.IntersectionObserver = IntersectionObserverVisualizerWrapper();

  on(window, '@submit', (e) => {
    console.log('submit 실행');
    window.IntersectionObserver = IntersectionObserverVisualizerWrapper();
  });

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
