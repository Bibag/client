import { get, post, put } from '@/services/fetch';
import { IApiResponse } from '@/services/fetch/type';
import { IUserData, IResponseUser, IRequestSignUpUser, IRequestUpdateUserProfile, IRequestSignInUser } from '@/state';

const userApi = {
  get: async function (): Promise<IApiResponse<IUserData | null>> {
    try {
      const response = await get<IResponseUser>('/api/users/currentUser');

      return { success: true, data: response?.data?.currentUser };
    } catch (error) {
      return {
        success: false,
        data: null,
      };
    }
  },
  signUp: async function (payload: IRequestSignUpUser): Promise<IApiResponse<IUserData | null>> {
    try {
      const response = await post<IUserData>('/api/users/signup', payload);

      return { success: true, data: response?.data };
    } catch (error) {
      return { success: false, data: null };
    }
  },
  signIn: async function (payload: IRequestSignInUser): Promise<IApiResponse<IUserData | null>> {
    try {
      const response = await post<IUserData>('/api/users/signin', payload);

      return { success: true, data: response?.data };
    } catch (error) {
      return { success: false, data: null };
    }
  },
  signOut: async function (): Promise<null> {
    try {
      await post<null>('/api/users/signout');

      return null;
    } catch (error) {
      return null;
    }
  },
  update: async function (payload: IRequestUpdateUserProfile): Promise<IApiResponse<IUserData | null>> {
    try {
      const response = await put<IUserData>('/api/users/update-profile', payload);

      return { success: true, data: response?.data };
    } catch (error) {
      return { success: false, data: null };
    }
  },
};

export { userApi };
