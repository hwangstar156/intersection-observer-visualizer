export const { on, emit } = {
  on<T>(
    element: HTMLElement | Window,
    eventName: string,
    handler: (event: CustomEvent<T>) => void,
  ) {
    element.addEventListener(eventName, handler);
  },
  emit<T>(element: HTMLElement | Window, eventName: string, data: T) {
    const customEvent = new CustomEvent<T>(eventName, {
      detail: data,
    });
    element.dispatchEvent(customEvent);
  },
};
