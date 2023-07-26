import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRequestSignUpUser, IRequestUpdateUserProfile, IUserData, IUserState } from './type';
import { IActionStatus } from '../type';

const initialState: IUserState = {
  loading: false,
  status: IActionStatus.Idle,
  data: {
    email: '',
    id: '',
    access_token: '',
    refresh_token: '',
    name: '',
    avatar: '',
  },
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state: IUserState) => {
      state.loading = true;
      state.status = IActionStatus.Pending;
    },
    getUserSuccess: (state: IUserState, action: PayloadAction<IUserData>) => {
      state.loading = false;
      state.status = IActionStatus.Success;
      state.data = action.payload;
    },
    getUserFailed: (state: IUserState) => {
      state.loading = false;
      state.status = IActionStatus.Failed;
      state.data = initialState.data;
    },

    signUpUserRequest: (state: IUserState, action: PayloadAction<IRequestSignUpUser>) => {
      state.loading = true;
      state.status = IActionStatus.Idle;
    },
    signUpUserSuccess: (state: IUserState, action: PayloadAction<IUserData>) => {
      state.loading = false;
      state.status = IActionStatus.Success;
      state.data = action.payload;
    },
    signUpUserFailed: (state: IUserState) => {
      state.loading = false;
      state.status = IActionStatus.Failed;
    },

    signOutRequest: (state: IUserState) => {
      state.data = initialState.data;
    },

    updateUserProfileRequest: (state: IUserState, action: PayloadAction<IRequestUpdateUserProfile>) => {
      state.loading = true;
      state.status = IActionStatus.Idle;
    },
    updateUserProfileSuccess: (state: IUserState, action: PayloadAction<IUserData>) => {
      state.loading = false;
      state.status = IActionStatus.Success;
      state.data = action.payload;
    },
    updateUserProfileFailed: (state: IUserState) => {
      state.loading = false;
      state.status = IActionStatus.Failed;
    },
  },
});

export const {
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  signUpUserRequest,
  signUpUserSuccess,
  signUpUserFailed,
  signOutRequest,
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFailed,
} = UserSlice.actions;

export default UserSlice.reducer;
