import { Dispatch } from 'redux';
import { store } from '..';
import * as types from '../types/watchlist';
import UserMovieService from '../../api/UserMovieService';

export default class WatchlistActionsCreator {
  static dispatch: Dispatch<types.WatchlistActions> = store.dispatch;

  static async addToWatchList(title: string) {
    try {
      await UserMovieService.addMovieToWatchedList(title);
      this.dispatch({
        type: types.ADD_TO_WATCH_LIST,
        title,
      });
    } catch (err) {}
  }

  static async removeFromWatchList(title: string) {
    try {
      await UserMovieService.removeMovieFromWatchedList(title);
      this.dispatch({
        type: types.REMOVE_FROM_WATCH_LIST,
        title,
      });
    } catch (err) {}
  }

  static async fetchWatchList() {
    try {
      const movies = await UserMovieService.fetchWatchlist();
      this.dispatch({
        type: types.FETCH_WATCH_LIST,
        movies,
      });
    } catch (err) {}
  }
}
