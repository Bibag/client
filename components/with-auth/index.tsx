/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteNames } from '@/consts/route-names';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useRouter } from 'next/router';
import { FC } from 'react';

const WithAuth = (OriginalComponent: FC) => {
  function NewComponent(props: any) {
    const { email } = useTypedSelector((state) => state.user.data);

    const router = useRouter();

    if (!email) {
      router.push(RouteNames.Login);

      return null;
    }

    return <OriginalComponent {...props} />;
  }

  return NewComponent;
};

export default WithAuth;
