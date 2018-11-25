import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './reducers/index';
var store = createStore(Reducer);
ReactDOM.render(
  <Provider store={store}>
     <Main  />
  </Provider>,
  document.getElementById('root')
);
