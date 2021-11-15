import { combineReducers } from 'redux';
import user from './user';

export default combineReducers({
  user,
});

/* function convertCastAndDirectors() {
  const items: { cast: string; directors: string }[] = [];
  const updatedItems: { cast: string[]; directors: string }[] = [];

  for (let index in items) {
    updatedItems[index] = {
      ...items[index],
      cast: items[index].cast.split(','),
      directors: items[index].directors.split(','),
    };
  }
} */
