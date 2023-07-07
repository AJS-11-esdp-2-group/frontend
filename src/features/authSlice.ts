import authApi from '../Store/services/auth';
import { UserState } from '../Store/user/userTypes';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: UserState = {
	isAuthenticated: false,
	isLoading: false,
	response: {},
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(authApi.endpoints.signIn.matchPending, (state, action) => {
				state.isAuthenticated = false;
				state.isLoading = true;
			})
			.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
				state.response = action.payload;
				state.isAuthenticated = true;
				state.isLoading = false;
			})
			.addMatcher(authApi.endpoints.signIn.matchRejected, (state, action) => {
				state.isAuthenticated = false;
				state.isLoading = false;
			})
			.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
				state.isAuthenticated = false;
				state.isLoading = false;
				state.response = {};
			});
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
