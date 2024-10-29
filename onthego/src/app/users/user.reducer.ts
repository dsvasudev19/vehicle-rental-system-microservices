import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import { AuthenticateUserAndStoreData, GetUserByToken } from './user.action';

export const initialState: User | null = null ;


export const userReducer=createReducer(
    initialState,
    on(AuthenticateUserAndStoreData,(state)=>state),
    on(GetUserByToken,(state)=>state)
)
