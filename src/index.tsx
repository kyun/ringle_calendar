/* eslint-disable no-undef */
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import { store } from './app/store';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import welcome from './utils/welcome';
const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
welcome();
root.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:viewmode/:date" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
