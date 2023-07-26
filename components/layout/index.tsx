import { FC, ReactNode } from 'react';
import Header from './header';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Wizzard</title>
      </Head>
      <Header />
      {children}
    </>
  );
};

export default Layout;
