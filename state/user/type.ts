import { IActionStatus } from '../type';

export interface IUserData {
  email: string;
  id: string;
  access_token: string;
  refresh_token: string;
  name: string;
  avatar: string;
}

export interface IUserState {
  loading: boolean;
  status: IActionStatus;
  data: IUserData;
}

export interface IResponseUser {
  success: boolean;
  currentUser: IUserData;
}

export interface IRequestSignUpUser {
  email: string;
  password: string;
  name: string;
}
export interface IRequestSignInUser {
  email: string;
  password: string;
}

export interface IRequestUploadAvatar {
  image: File | null;
}

export interface IRequestUpdateUserProfile {
  email: string;
  name?: string;
  avatar?: string;
}

export interface IResponseUploadAvatar {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}
