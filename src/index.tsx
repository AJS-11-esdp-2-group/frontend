import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
// eslint-disable-next-line import/order
import store from './Store/services/store';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
      </Provider>
  </React.StrictMode>,
);
