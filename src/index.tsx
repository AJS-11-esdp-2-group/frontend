import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Store/services/store';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();
