import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
// ant design css import and toastify
import 'antd/dist/antd.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// rootReducer
import rootReducer from './reducers'
// store
const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer
        autoClose={3000}
      />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

