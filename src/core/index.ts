// 사용자에게 제공해야될 옵션..?

import { iframeToParentEventEmitter } from '../util/messageEvent';

const intersectDecorator =
  (func: IntersectionObserverCallback) =>
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    func(entries, observer);

    // entries.forEach((entry) => {
    //   window.parent.postMessage(
    //     JSON.stringify({
    //       rootBounds: entry.rootBounds,
    //       boundingClientRect: entry.boundingClientRect,
    //     }),
    //     {
    //       targetOrigin: '*',
    //     },
    //   );
    // });
  };

interface CreateRectArgs {
  x: number;
  y: number;
  color: string;
  height: number;
  width: number;
}

// const setOptions = (hashId: string | null) => {
//   //TODO: 제일 먼저 실행되도록 빼기
//   on<IntersectionObserverOptionFormType>(window, '@submit', (e) => {
//     alert('됨');
//     const { bottom, left, right, threshold, top } = e.detail;
//     const rootMargin = `${top.value}${top.cssLengthUnit} ${right.value}${right.cssLengthUnit} ${bottom.value}${bottom.cssLengthUnit} ${left.value}${left.cssLengthUnit}`;

//     const customOptions = {
//       root: hashId,
//       rootMargin,
//       threshold: threshold.value,
//     };

//     sessionStorage.setItem(
//       '__INTERSECTION_OBSERVER_VISUALIZER_CUSTOM_OPTIONS__',
//       JSON.stringify(customOptions),
//     );
//   });
// };

export class IntersectionObserverVisualizer extends IntersectionObserver {
  id: string | null;
  enabled: boolean;
  iovRoot: IntersectionObserverInit['root'];
  iovTarget?: Element;
  options?: IntersectionObserverInit;
  visualizerInitMap: Map<string, boolean>;
  isInitCache: boolean;
  targetId: number;

  static lastId = 0;
  static tempIdCachedMap = new Map<
    string,
    {
      id: string;
      idx: number;
      root: IntersectionObserverInit['root'];
      target?: Element;
      rootMargin?: string;
      threshold?: number | number[];
    }[]
  >();
  static idCachedMap = new Map<
    string,
    {
      id: string;
      idx: number;
      root: IntersectionObserverInit['root'];
      target?: Element;
      rootMargin?: string;
      threshold?: number | number[];
    }[]
  >();
  static currentServicePath: string | null = null;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit & { enabled?: boolean },
  ) {
    // options 파싱진행 -> 사용자 custom input을 한다면 그것을 기반으로, 없다면 기본값으로 할 수 있도록 설정

    const callStack = new Error().stack;
    const isExternalObserver = callStack?.includes(
      'node_modules/next/dist/client/use-intersection.js',
    );

    const enabled = !!(!isExternalObserver && (window.__IOV_ALL_ENABLED__ || options?.enabled));

    super(enabled ? intersectDecorator(callback) : callback, options);

    if (!options?.root) {
      this.iovRoot = document;
    } else {
      this.iovRoot = options?.root;
    }

    if (enabled) {
      this.id = `iov-${IntersectionObserverVisualizer.lastId++}`;
    } else {
      this.id = null;
    }

    if (IntersectionObserverVisualizer.currentServicePath !== window.location.pathname) {
      IntersectionObserverVisualizer.currentServicePath = window.location.pathname;
      this.syncIdCacheMap();
    }

    this.enabled = enabled;
    this.options = options;
    this.visualizerInitMap = new Map();
    this.isInitCache = false;
    this.targetId = 0;
    this.initWhenExistCache();
  }

  observe(target: Element): void {
    super.observe(target);

    if (this.enabled) {
      this.iovTarget = target;

      if (!this.isInitCache) {
        this.init(`${this.id}-target-${this.targetId++}`);
      }
    }
  }

  getRootBounds() {
    if (this.iovRoot instanceof Element) {
      return this.iovRoot.getBoundingClientRect();
    }

    return null;
  }

  syncIdCacheMap() {
    IntersectionObserverVisualizer.idCachedMap = new Map([
      ...IntersectionObserverVisualizer.tempIdCachedMap,
    ]);
  }

  initWhenExistCache() {
    const cache = IntersectionObserverVisualizer.idCachedMap.get(window.location.pathname);

    if (cache) {
      let cacheIdx = null;

      for (const [idx, value] of cache.entries()) {
        let isEqualOption = false;

        if (
          value.rootMargin === this.options?.rootMargin &&
          value.threshold === this.options?.threshold
        ) {
          isEqualOption = true;
        }

        if (isEqualOption && idx === value.idx) {
          cacheIdx = idx;
        }
      }

      if (cacheIdx) {
        if (this.iovRoot instanceof Element) {
          this.iovRoot.classList.add(`${cache[cacheIdx].id}-root`);
        }

        if (this.iovTarget instanceof Element) {
          this.iovTarget.classList.add(`${cache[cacheIdx].id}-target`);
        }

        iframeToParentEventEmitter.emit({
          key: 'targetInfo',
          id: cache[cacheIdx].id,
          isDocumentRoot: this.iovRoot instanceof Document,
          currentPath: window.location.pathname,
        });

        this.isInitCache = true;

        return;
      }
    }
  }

  init(targetId: string) {
    const tempCache = IntersectionObserverVisualizer.tempIdCachedMap.get(window.location.pathname);

    if (this.id) {
      if (
        this.iovRoot instanceof Element &&
        this.iovRoot.classList.value.split(' ').some((value) => value.includes('iov'))
      ) {
        return;
      }

      if (
        this.iovTarget instanceof Element &&
        this.iovTarget.classList.value.split(' ').some((value) => value.includes('target-'))
      ) {
        return;
      }

      if (this.iovRoot instanceof Element) {
        this.iovRoot.classList.add(`${this.id}-root`);
      }

      if (this.iovTarget instanceof Element) {
        this.iovTarget.classList.add(targetId);
      }

      iframeToParentEventEmitter.emit({
        key: 'targetInfo',
        id: this.id,
        targetId,
        isDocumentRoot: this.iovRoot instanceof Document,
        currentPath: window.location.pathname,
        rootMargin: this.options?.rootMargin,
        threshold: this.options?.threshold,
      });

      const rootRect = this.getRootBounds();
      const targetRect = this.iovTarget?.getBoundingClientRect();

      if (rootRect === null && targetRect) {
        this.drawDocumentRect();
        this.drawRect(targetRect, 'blue');
      }

      if (rootRect && targetRect) {
        this.drawRect(rootRect, 'red');
        this.drawRect(targetRect, 'blue');
      }

      this.visualizerInitMap.set(this.id, true);

      console.log('tempIdCachedMap', IntersectionObserverVisualizer.tempIdCachedMap);

      if (tempCache) {
        IntersectionObserverVisualizer.tempIdCachedMap.set(
          window.location.pathname,
          tempCache.concat({
            id: this.id,
            root: this.iovRoot,
            target: this.iovTarget,
            rootMargin: this.options?.rootMargin,
            threshold: this.options?.threshold,
            idx: tempCache.length,
          }),
        );
      } else {
        IntersectionObserverVisualizer.tempIdCachedMap.set(window.location.pathname, [
          {
            id: this.id,
            root: this.iovRoot,
            target: this.iovTarget,
            rootMargin: this.options?.rootMargin,
            threshold: this.options?.threshold,
            idx: 0,
          },
        ]);
      }
    }
  }

  createActiveRectangle = ({ x, y, color, height, width }: CreateRectArgs) => {
    const div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.left = `${x - 1}px`;
    div.style.top = `${y - 1}px`;
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.border = `2px solid ${color}`;
    div.style.zIndex = '1';
    div.style.pointerEvents = 'none'; // 이렇게 할 시 네모에 상호작용 안됨.
    div.style.transition = 'opacity 1s ease-in';

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        div.style.opacity = '0';
      }),
    );

    div.addEventListener('transitionend', () => {
      document.body.removeChild(div);
    });

    document.body.append(div);
  };

  drawDocumentRect() {
    const height = document.documentElement.clientHeight + document.documentElement.scrollTop - 10;
    const width = document.documentElement.clientWidth - 10;

    this.createActiveRectangle({
      x: 1,
      y: 1,
      color: 'red',
      height,
      width,
    });
  }

  drawRect(rect: DOMRect, color: 'blue' | 'red') {
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;

    this.createActiveRectangle({
      x,
      y,
      color,
      height: rect.height,
      width: rect.width,
    });
  }

  drawRectByMessage = () => {
    window.addEventListener('message', (e) => {
      const entry = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;

      if (!entry || !Object.keys(entry).some((key) => key === 'rootBounds')) {
        return;
      }

      const rootBounds = entry.rootBounds;
      const boundingClientRect = entry.boundingClientRect;
      const $iframe = document.querySelector('.io-iframe');
      const rect = $iframe?.getBoundingClientRect() as DOMRect;

      const x = rect.left + window.scrollX - 1;
      const y = rect.top + window.scrollY - 1;

      if (!rootBounds) {
        console.log('rootBounds가 없습니다.');
        return;
      }

      this.createActiveRectangle({
        x,
        y,
        color: 'red',
        height: 0.75 * rootBounds.height,
        width: 0.75 * rootBounds.width,
      });

      this.createActiveRectangle({
        x,
        y,
        color: 'blue',
        height: 0.75 * boundingClientRect.height,
        width: 0.75 * boundingClientRect.width,
      });
    });
  };
}
