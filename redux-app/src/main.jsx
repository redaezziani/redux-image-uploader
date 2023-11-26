import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/globals.css'
import reducer from './store/reducers.jsx'
import {
  Provider,
} from 'react-redux';
import {
  createStore,
} from 'redux';


const store = createStore(reducer);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
