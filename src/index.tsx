import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/order
import store from './Store/services/store';
import { Provider } from 'react-redux';
import { createTheme } from '@mui/material';

export const GlobalTheme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => theme.unstable_sx({}),
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            marginBottom: 3,
          }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            marginBottom: 3,
            marginTop: 3,
          }),
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
