import styled from 'styled-components';

import { LeftNavigationBar } from './manager/left-navigation-bar';
import { useIdMapContext } from './manager/context/idMap';
import { useEffect } from 'react';
import { iframeToParentEventEmitter } from './util/messageEvent';

const IframeContainer = styled.div`
  padding: 10px;
  margin-top: 10px;
  width: 1100px;
  height: 620px;
  overflow: hidden;
`;

const Ifame = styled.iframe`
  -ms-zoom: 0.75;

  -moz-transform: scale(0.75);
  -moz-transform-origin: 0 0;

  -o-transform: scale(0.75);
  -o-transform-origin: 0 0;

  -webkit-transform: scale(0.75);
  -webkit-transform-origin: 0 0;

  transform: scale(0.75);
  transform-origin: 0 0;
  top: 0px;
  left: 0px;

  width: 133%;
  height: 133%;
`;

const MainContainer = styled.div`
  margin-left: 400px;
`;

interface TargetInfoMessageType {
  key: string;
  isDocumentRoot: boolean;
  id: string;
  targetId: string;
  currentPath: string;
  rootMargin: IntersectionObserverInit['rootMargin'];
  threshold: IntersectionObserverInit['threshold'];
}

const isTargetInfoMessage = (e: MessageEvent<object>): e is MessageEvent<TargetInfoMessageType> => {
  const data = e.data;

  return 'key' in data && 'id' in data;
};

export function App() {
  const [_, setIdMap] = useIdMapContext();

  useEffect(() => {
    iframeToParentEventEmitter.on((e: MessageEvent<object>) => {
      if (!isTargetInfoMessage(e)) {
        return;
      }

      if (e.data.key !== 'targetInfo') {
        return;
      }

      const { id, isDocumentRoot, currentPath, targetId, rootMargin, threshold } = e.data;

      console.log(id, isDocumentRoot, currentPath, targetId, rootMargin, threshold);

      const $iframe = document.querySelector('.io-iframe') satisfies HTMLIFrameElement | null;

      if ($iframe) {
        const targetClassName = targetId;
        const rootClassName = isDocumentRoot ? null : `${id}-root`;

        setIdMap((prev) => ({
          ...prev,
          [currentPath]: {
            ...prev?.[currentPath],
            rootObservers: {
              ...prev?.[currentPath]?.rootObservers,
              [id as string]: {
                targetObservers: {
                  ...prev?.[currentPath]?.rootObservers?.[id]?.targetObservers,
                  [targetClassName]: {
                    rootClassName,
                    targetId,
                    rootMargin,
                    threshold,
                  },
                },
                isExpand: false,
              },
            },
            isExpand: false,
          },
        }));
      }
    });
  }, []);

  return (
    <>
      <LeftNavigationBar />
      <MainContainer>
        <IframeContainer>
          <Ifame
            className="io-iframe"
            src="http://localhost:3000"
            width={1100}
            height={620}
            allowFullScreen
          ></Ifame>
        </IframeContainer>
      </MainContainer>
    </>
  );
}
