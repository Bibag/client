import { userApi } from '@/apis/user';
import { IApiResponse } from '@/services/fetch/type';
import { IRequestSignUpUser, IRequestUpdateUserProfile, IUserData } from './type';
import { put, takeEvery } from 'redux-saga/effects';
import {
  getUserFailed,
  getUserRequest,
  getUserSuccess,
  signUpUserFailed,
  signUpUserRequest,
  signUpUserSuccess,
  updateUserProfileFailed,
  updateUserProfileRequest,
  updateUserProfileSuccess,
} from './slice';
import { PayloadAction } from '@reduxjs/toolkit';

export function* getUserWorker() {
  const response: IApiResponse<IUserData> = yield userApi.get();

  if (response.success && response.data) {
    yield put({ type: getUserSuccess.toString(), payload: response.data });

    return;
  }

  yield put({ type: getUserFailed.toString() });

  return;
}

export function* signUpUserWorker(action: PayloadAction<IRequestSignUpUser>) {
  const response: IApiResponse<IUserData> = yield userApi.signUp(action.payload);

  if (response.success && response.data) {
    yield put({ type: signUpUserSuccess.toString(), payload: response.data });

    return;
  }

  yield put({ type: signUpUserFailed.toString() });

  return;
}

export function* updateUserProfileWorker(action: PayloadAction<IRequestUpdateUserProfile>) {
  const response: IApiResponse<IUserData> = yield userApi.update(action.payload);

  if (response.success && response.data) {
    yield put({ type: updateUserProfileSuccess.toString(), payload: response.data });

    return;
  }

  yield put({ type: updateUserProfileFailed.toString() });

  return;
}

export default function* userWatcher() {
  yield takeEvery(getUserRequest.toString(), getUserWorker);
  yield takeEvery(signUpUserRequest.toString(), signUpUserWorker);
  yield takeEvery(updateUserProfileRequest.toString(), updateUserProfileWorker);
}
