import React from 'react';
import { MutationStatus, UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { LoginForm, User } from '../types/user';
import { useMount, useSessionStorageState } from 'ahooks';
import toast from 'react-hot-toast';
import userService from '../../services/client/userService';

export interface LoginContextValue {
  logIn: UseMutateAsyncFunction<any, Error, LoginForm, unknown>;
  logOut: () => void;
  status: MutationStatus;
  user: User | null;
}
export const defaultLoginContextValue: LoginContextValue = {
  logIn: userService.login,
  logOut: () => {},
  status: 'idle',
  user: null,
};
const LoginContext = createContext<LoginContextValue | undefined>(defaultLoginContextValue);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [save, setSave] = useSessionStorageState<string | undefined>('is-logged');
  const [user, setUser] = useState(null);

  const { mutateAsync, status } = useMutation({
    mutationFn: userService.login,
    onSuccess: (data) => {
      setUser(data);
      setSave(JSON.stringify(data));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const logout = useCallback(() => {
    setSave();
    setUser(null);
    toast.success('Logout success');
  }, [setSave]);

  useMount(() => save && setUser(JSON.parse(save)));

  const value: LoginContextValue = {
    status,
    logIn: mutateAsync,
    logOut: logout,
    user,
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export const useLogin = (): LoginContextValue => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginContextProvider');
  }
  return context;
};

export default LoginContext;
