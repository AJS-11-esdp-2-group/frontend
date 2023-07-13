/* eslint-disable no-empty-pattern */
import authApi from '../Store/services/auth';
import { UserState } from '../Store/user/userTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
	isAuthenticated: false,
	isLoading: false,
	user: [],
};

const storedState: UserState = localStorage.getItem('authState')
	? (localStorage.getItem('authState') as unknown as UserState)
	: initialState;

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(authApi.endpoints.signIn.matchPending, (state) => {
				state.isAuthenticated = false;
				state.isLoading = true;
			})
			.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
				state.user[0] = action.payload;
				state.isAuthenticated = true;
				state.isLoading = false;
				localStorage.setItem('authState', JSON.stringify(state));
			})
			.addMatcher(authApi.endpoints.signIn.matchRejected, (state) => {
				state.isAuthenticated = false;
				state.isLoading = false;
			})
			.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
				state.isAuthenticated = false;
				state.isLoading = false;
				state.user[0] = {};
				localStorage.removeItem('authState');
			});
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
