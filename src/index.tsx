import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { App } from './App';
import { Layout } from './layout';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global-styles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Layout>
        <App />
      </Layout>
    </ThemeProvider>
  </>,
);
