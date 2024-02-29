'use client';
import React from 'react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useLogin } from '../utils/context/loginContext';

const withAuth = ({ Component }: { Component: any }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useLogin();
  return function IsAuth(props: any) {
    const auth = user;

    useEffect(() => {
      if (!auth) {
        return redirect('/');
      }
    }, [auth]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
