import { FC, useState } from 'react';
import style from './style.module.scss';
import { useRouter } from 'next/router';
import { userApi } from '@/apis/user';
import { useActions } from '@/hooks/useActions';
import Link from 'next/link';
import { RouteNames } from '@/consts/route-names';
import UploadAvatar from './avatar/UploadAvatar';
import { upload } from '@/services/fetch';
import { IResponseUploadAvatar } from '@/state';

const Register: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);

  const router = useRouter();

  const { getUserSuccess, updateUserProfileRequest } = useActions();

  const handleClickSubmit = async () => {
    if (!email || !password || !name) {
      return;
    }

    try {
      setErr(false);
      setIsLoading(true);
      let avatarUrl = '';

      const response = await userApi.signUp({ email, password, name });

      if (!response.success || !response.data) {
        setIsLoading(false);
        return;
      }

      if (avatarFile) {
        const res = await upload<IResponseUploadAvatar>('/api/upload/single', { image: avatarFile });

        if (res?.data) {
          avatarUrl = res?.data.path;
          updateUserProfileRequest({ email, avatar: avatarUrl, name });
        }
      }

      setIsLoading(false);

      if (response.success && response.data) {
        getUserSuccess({ ...response.data, avatar: avatarUrl, access_token: '', refresh_token: '' });

        router.push('/');
      }
    } catch (error) {
      setErr(true);
      setIsLoading(false);
      return;
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setPassword('');
    setErr(false);
  };

  return (
    <div className="container">
      <div className={style['form-wrapper']}>
        <div className={style['form']}>
          <div className="is-size-1 has-text-centered mb-6">Sign Up</div>
          <UploadAvatar avatarFile={avatarFile} setAvatarFile={setAvatarFile} />
          <div className="field">
            <label className="label">Name</label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-warning"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-warning"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control is-expanded">
              <input
                type="password"
                className="input is-warning"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="field is-grouped mt-5">
            <div className="control">
              <button
                className={`button is-primary is-rounded ${isLoading && 'is-loading'}`}
                onClick={handleClickSubmit}
              >
                Sign up
              </button>
            </div>
            <div className="control">
              <button className="button is-link is-light is-rounded" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
          <div className="is-flex is-justify-content-center">
            <div className="mr-2">{'You already have account?'}</div>
            <Link href={RouteNames.Login}>
              <span className="has-text-primary">Log In</span>
            </Link>
          </div>
          {err && <div className="has-text-danger">Something went wrong</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
