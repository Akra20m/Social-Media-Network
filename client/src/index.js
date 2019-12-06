import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const presistedState = loadFromLocalStorage();

const store=createStore(reducers,presistedState,applyMiddleware(reduxThunk));

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.querySelector('#root')
);

function saveToLocalStorage(state) {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
}

function loadFromLocalStorage(){
  const serializedState = localStorage.getItem('state');
  if(serializedState===null) return undefined;
  return JSON.parse(serializedState)
}

store.subscribe(() => saveToLocalStorage(store.getState()));