import { combineReducers } from 'redux';
import user from './user';
import watchlist from './watchlist';

export default combineReducers({
  user,
  watchlist,
});
