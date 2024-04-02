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
  margin-left: 350px;
`;

interface TargetInfoMessageType {
  key: string;
  isDocumentRoot: boolean;
  id: string;
  currentPath: string;
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

      const { id, isDocumentRoot, currentPath } = e.data;

      console.log(id, isDocumentRoot, currentPath);

      const $iframe = document.querySelector('.io-iframe') satisfies HTMLIFrameElement | null;

      if ($iframe) {
        const targetClassName = `${id}-target`;
        const rootClassName = isDocumentRoot ? null : `${id}-root`;

        setIdMap((prev) => ({
          ...prev,
          [id as string]: {
            rootClassName,
            targetClassName,
            currentPath,
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
            src="http://localhost:3004/rentacar"
            width={1100}
            height={620}
            allowFullScreen
          ></Ifame>
        </IframeContainer>
      </MainContainer>
    </>
  );
}
