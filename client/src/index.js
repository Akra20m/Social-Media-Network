import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const presistedState = loadFromSessionStorage();

const store=createStore(reducers,presistedState,applyMiddleware(reduxThunk));

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.querySelector('#root')
);

function saveToSessionStorage(state) {
  const serializedState = JSON.stringify(state);
  sessionStorage.setItem('state', serializedState);
}

function loadFromSessionStorage(){
  const serializedState = sessionStorage.getItem('state');
  if(serializedState===null) return undefined;
  return JSON.parse(serializedState)
}

store.subscribe(() => saveToSessionStorage(store.getState()));





