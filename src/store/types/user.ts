export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';

interface AuthenticateAction {
  type: typeof AUTHENTICATED;
  user: User;
}

interface UnauthenticateAction {
  type: typeof UNAUTHENTICATED;
}

export type UserActions = AuthenticateAction | UnauthenticateAction;
