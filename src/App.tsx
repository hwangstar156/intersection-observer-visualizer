import styled from 'styled-components';
import { TabProvider } from './manager/context/tab';
import { ToggleProvider } from './manager/context/toggle';
import { LeftNavigationBar } from './manager/left-navigation-bar';

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

export function App() {
  return (
    <ToggleProvider>
      <TabProvider>
        <LeftNavigationBar />
        <MainContainer>
          <IframeContainer>
            <Ifame
              className="io-iframe"
              src="http://localhost:3004/rentacar"
              width={1000}
              height={800}
              allowFullScreen
            ></Ifame>
          </IframeContainer>
        </MainContainer>
      </TabProvider>
    </ToggleProvider>
  );
}
