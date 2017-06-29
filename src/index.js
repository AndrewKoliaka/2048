import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import actionTypes from './actions/actionTypes';
import createAction from './actions/actionCreator';
import './index.css';

const store = createStore(reducers);

store.dispatch(createAction(actionTypes.NEW_GAME));

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();