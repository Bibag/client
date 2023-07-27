import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { userApi } from '@/apis/user';
import { RouteNames } from '@/consts/route-names';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import style from './style.module.scss';

const Header: FC = () => {
  const { id, avatar, email, name } = useTypedSelector((state) => state.user.data);

  const { signOutRequest } = useActions();

  const handleSignOut = async () => {
    await userApi.signOut();

    signOutRequest();
  };

  const router = useRouter();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link href={RouteNames.Home}>
            <img src="/logo.svg" width="112" height="28" alt="" />
          </Link>
        </div>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" onClick={() => router.push(RouteNames.Home)}>
            Home
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" onClick={() => router.push(RouteNames.Address)}>
              Address
            </a>

            <div className="navbar-dropdown">
              <a className="navbar-item" onClick={() => router.push(RouteNames.AddCity)}>
                Add City
              </a>
              <a className="navbar-item" onClick={() => router.push(RouteNames.AddDistrict)}>
                Add District
              </a>
              <a className="navbar-item" onClick={() => router.push(RouteNames.AddWard)}>
                Add Ward
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {!!id && (
              <div className={style['user-bar']}>
                <div className={style['user-profile']} onClick={() => router.push(RouteNames.Profile)}>
                  {avatar ? (
                    <div className={style['avatar-wrapper']}>
                      <img className={style['avatar']} src={avatar} alt="" />
                    </div>
                  ) : (
                    <div className="button mr-3">{name || email}</div>
                  )}
                </div>
              </div>
            )}
            <div className="buttons">
              {!id ? (
                <>
                  <a className="button is-info is-rounded is-small" onClick={() => router.push(RouteNames.Login)}>
                    Log in
                  </a>
                  <a className="button is-primary is-rounded is-small" onClick={() => router.push(RouteNames.Register)}>
                    <strong>Sign up</strong>
                  </a>
                </>
              ) : (
                <>
                  <a className="button is-danger is-rounded is-small" onClick={handleSignOut}>
                    Sign Out
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
