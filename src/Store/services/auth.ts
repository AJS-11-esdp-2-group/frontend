import { api } from '../../features/index';
import { IUser } from '../../interfaces/IUser';
import { UserForm } from '../../interfaces/RegisterForm';
import { loginForm } from '../../interfaces/loginForm';

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IUser, UserForm>({
      query: (body) => ({
        url: '/users',
        method: 'post',
        body,
      }),
    }),
    signIn: build.mutation<IUser, loginForm>({
      query: (body) => ({
        url: 'users/login',
        method: 'post',
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'users/logout',
        method: 'delete',
      }),
    }),
  }),
});


export const { useSignUpMutation, useSignInMutation, useLogoutMutation } =
  authApi;

export default authApi;
