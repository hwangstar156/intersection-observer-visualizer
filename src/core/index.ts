// 사용자에게 제공해야될 옵션..?

const intersectDecorator =
  (func: IntersectionObserverCallback) =>
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    func(entries, observer);

    // 추가 로직
    console.log(entries);
  };

class IntersectionObserverVisualizer extends IntersectionObserver {
  enabled: boolean;

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit) {
    super(intersectDecorator(callback), options);

    this.enabled = true;
  }

  init = () => {};
}
