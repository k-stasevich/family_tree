import { combineReducers } from 'redux';
import nodeReducer from './NodeReducer';

const rootReducer = combineReducers({
  nodeReducer,
});

export default rootReducer;