export const FETCH_WATCH_LIST = 'FETCH_WATCH_LIST';
export const ADD_TO_WATCH_LIST = 'ADD_TO_WATCH_LIST';
export const REMOVE_FROM_WATCH_LIST = 'REMOVE_FROM_WATCH_LIST';

interface AddToWatchList {
  type: typeof ADD_TO_WATCH_LIST;
  title: string;
}

interface RemoveFromWatchList {
  type: typeof REMOVE_FROM_WATCH_LIST;
  title: string;
}

interface FetchWatchList {
  type: typeof FETCH_WATCH_LIST;
  movies: string[];
}

export type WatchlistActions =
  | AddToWatchList
  | RemoveFromWatchList
  | FetchWatchList;
