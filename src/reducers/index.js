import { combineReducers } from 'redux';
import posts from './posts.js';
import authReducer from './auth.js';

export const reducers = combineReducers({ posts ,authReducer });