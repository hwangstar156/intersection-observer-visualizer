// 사용자에게 제공해야될 옵션..?

import { IntersectionObserverOptionFormType } from '../manager/left-navigation-bar';
import { on } from '../util/custom-event';

const intersectDecorator =
  (func: IntersectionObserverCallback) =>
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    func(entries, observer);

    entries.forEach((entry) => {
      window.parent.postMessage(
        JSON.stringify({
          rootBounds: entry.rootBounds,
          boundingClientRect: entry.boundingClientRect,
        }),
        {
          targetOrigin: '*',
        },
      );
    });
  };

const setOptions = (hashId: string | null) => {
  //TODO: 제일 먼저 실행되도록 빼기
  on<IntersectionObserverOptionFormType>(window, '@submit', (e) => {
    alert('됨');
    const { bottom, left, right, threshold, top } = e.detail;
    const rootMargin = `${top.value}${top.cssLengthUnit} ${right.value}${right.cssLengthUnit} ${bottom.value}${bottom.cssLengthUnit} ${left.value}${left.cssLengthUnit}`;

    const customOptions = {
      root: hashId,
      rootMargin,
      threshold: threshold.value,
    };

    sessionStorage.setItem(
      '__INTERSECTION_OBSERVER_VISUALIZER_CUSTOM_OPTIONS__',
      JSON.stringify(customOptions),
    );
  });
};

export class IntersectionObserverVisualizer extends IntersectionObserver {
  enabled: boolean;
  entry: IntersectionObserverEntry | null;
  customOptions: IntersectionObserverInit | { isActive: boolean };

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    // options 파싱진행 -> 사용자 custom input을 한다면 그것을 기반으로, 없다면 기본값으로 할 수 있도록 설정

    if (options?.root instanceof Element) {
      options?.root.classList.add('iov-1'); // TODO: hash id로 뒤에 변경
      setOptions('iov-1');
    }

    super(intersectDecorator(callback), options);

    this.enabled = true;
    this.customOptions = { root: options?.root, isActive: false };
    this.entry = null;
  }
}
