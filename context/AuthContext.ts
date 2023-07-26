import { IUserData } from '@/state';
import { createContext } from 'react';

export const AuthContext = createContext<IUserData>({
  name: '',
  email: '',
  avatar: '',
  id: '',
  access_token: '',
  refresh_token: '',
});
