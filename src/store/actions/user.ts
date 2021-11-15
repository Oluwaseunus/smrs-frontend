import { Dispatch } from 'redux';
import { store } from '..';
import * as types from '../types/user';

export default class UserActionsCreator {
  static dispatch: Dispatch<types.UserActions> = store.dispatch;

  static authenticate(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.dispatch({
      type: types.AUTHENTICATED,
      user,
    });
  }

  static unauthenticate() {
    localStorage.removeItem('user');
    this.dispatch({
      type: types.UNAUTHENTICATED,
    });
  }
}
