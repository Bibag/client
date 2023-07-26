import { FC, useEffect, useState } from 'react';
import style from './style.module.scss';
import { useRouter } from 'next/router';
import { userApi } from '@/apis/user';
import { useActions } from '@/hooks/useActions';
import Link from 'next/link';
import { RouteNames } from '@/consts/route-names';

const LogIn: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { getUserSuccess, getUserFailed } = useActions();

  useEffect(() => {
    getUserFailed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSubmit = async () => {
    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    const response = await userApi.signIn({ email, password });

    setIsLoading(false);

    if (response.success && response.data) {
      getUserSuccess({ ...response.data, refresh_token: '', access_token: '' });
      router.push('/');
    }
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      <div className={style['form-wrapper']}>
        <div className={style['form']}>
          <div className="is-size-1 has-text-centered mb-6">Log In</div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-info"
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
                className="input is-info"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="field is-grouped mt-5">
            <div className="control">
              <button className={`button is-info is-rounded ${isLoading && 'is-loading'}`} onClick={handleClickSubmit}>
                Log in
              </button>
            </div>
            <div className="control">
              <button className="button is-link is-light is-rounded" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
          <div className="is-flex is-justify-content-center">
            <div className="mr-2">{"You don't have account?"}</div>
            <Link href={RouteNames.Register}>
              <span className="has-text-primary">Register</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
