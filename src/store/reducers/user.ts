import * as types from '../types/user';

const initialState: User = {} as User;

export default function userReducer(
  state = initialState,
  action: types.UserActions
) {
  switch (action.type) {
    case types.AUTHENTICATED:
      return action.user;

    case types.UNAUTHENTICATED:
      return {} as User;

    default:
      return state;
  }
}
