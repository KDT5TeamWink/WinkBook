import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { Provider } from 'react-redux';
import store from './store/'
//import ReduxThunk from 'redux-thunk';
// import thunk from 'redux-thunk';
// import { createStore, applyMiddleware } from 'redux';
// import reducer from '_reducers/user_reducer.tsx';


//const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
//const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
 
    <App />
  
  </Provider>
)
