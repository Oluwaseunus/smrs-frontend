import * as types from '../types/watchlist';

const initialState: string[] = [];

export default function watchlistReducer(
  state = initialState,
  action: types.WatchlistActions
) {
  switch (action.type) {
    case types.ADD_TO_WATCH_LIST:
      return [...state, action.title];

    case types.REMOVE_FROM_WATCH_LIST: {
      const index = state.findIndex((e) => e === action.title);
      console.log({ state, action, index });

      if (index === -1) return state;

      const updatedState = Object.assign([], state);
      updatedState.splice(index, 1);
      return updatedState;
    }

    case types.FETCH_WATCH_LIST:
      return action.movies;

    default:
      return state;
  }
}
