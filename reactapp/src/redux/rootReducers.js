import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import EventsReducer from './events/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  ChangeLayoutMode,
  events:EventsReducer,
});

export default rootReducers;
