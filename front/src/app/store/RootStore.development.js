import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/RootReducer';
import DevTools from 'DevTools';

const enhancer = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}