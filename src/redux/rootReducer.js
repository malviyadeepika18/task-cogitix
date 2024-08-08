import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import episode from './slices/episode'

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
 
  epi : episode,
});

export { rootPersistConfig, rootReducer };
