export const iframeToParentEventEmitter = {
  on(callback: (e: MessageEvent<object>) => void) {
    window.addEventListener('message', callback);
  },
  emit(data: unknown) {
    window.parent.postMessage(data, {
      targetOrigin: '*',
    });
  },
};

export const parentToIframeEventEmitter = {
  on(callback: (e: MessageEvent<object>) => void) {
    window.addEventListener('message', callback);
  },
  emit(data: unknown) {
    const $iframe = document.querySelector('.io-iframe') satisfies HTMLIFrameElement | null;

    if ($iframe) {
      $iframe.contentWindow?.postMessage(data, {
        targetOrigin: '*',
      });
    }
  },
};
