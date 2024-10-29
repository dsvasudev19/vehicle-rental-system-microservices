import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const AuthenticateUserAndStoreData = createAction(
  '[User] Authenticate User',
  props<{ user: User }>()
);

export const GetUserByToken = createAction(
  '[User] Get User By Token',
  props<{ token: string }>()
);
