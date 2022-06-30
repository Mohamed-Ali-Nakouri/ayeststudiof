import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducers';
// (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
let composer = compose(applyMiddleware(thunk.withExtraArgument()));
if (process.env.NODE_ENV === 'development') composer = composeWithDevTools(applyMiddleware(thunk.withExtraArgument()));

const store = createStore(rootReducer, composer);

export default store;
