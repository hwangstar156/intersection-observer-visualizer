// 사용자에게 제공해야될 옵션..?

interface CreateRectArgs {
  x: number;
  y: number;
  bottom: number;
  color: string;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}

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

class IntersectionObserverVisualizer extends IntersectionObserver {
  enabled: boolean;
  entry: IntersectionObserverEntry | null;

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit) {
    super(intersectDecorator(callback), options);

    this.enabled = true;
    this.entry = null;
  }

  createActiveRectangle = ({
    x,
    y,
    bottom,
    color,
    height,
    left,
    right,
    top,
    width,
  }: CreateRectArgs) => {
    const div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.left = `${x - 1}px`;
    div.style.top = `${y - 1}px`;
    div.style.width = `${width + 1}px`;
    div.style.height = `${height + 1}px`;
    div.style.border = `2px solid ${color}`;
    div.style.zIndex = '1';
    div.style.marginLeft = `${left}px`;
    div.style.marginTop = `${top}px`;
    div.style.marginRight = `${right - width}px`;
    div.style.marginBottom = `${bottom - height}px`;
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

  init = () => {
    window.addEventListener('message', (e) => {
      this.entry = JSON.parse(e.data);

      if (!this.entry) {
        return;
      }

      const rootBounds = this.entry.rootBounds;
      const boundingClientRect = this.entry.boundingClientRect;
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
        bottom: rootBounds.bottom,
        color: 'red',
        height: rootBounds.height,
        left: rootBounds.left,
        right: rootBounds.right,
        top: rootBounds.top,
        width: rootBounds.width,
      });

      this.createActiveRectangle({
        x,
        y,
        bottom: boundingClientRect.bottom,
        color: 'blue',
        height: boundingClientRect.height,
        left: boundingClientRect.left,
        right: boundingClientRect.right,
        top: boundingClientRect.top,
        width: boundingClientRect.width,
      });
    });
  };
}
