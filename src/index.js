import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createStore, applyMiddleware ,compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

    const loggerMiddleware = store => next => action => {
      const result = next(action)
      return result
    }

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
  loggerMiddleware,
  thunk
)))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

reportWebVitals()
