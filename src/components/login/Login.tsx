'use client';
import React, { useLayoutEffect } from 'react';
import { IoIosLogIn } from 'react-icons/io';
import { useForm, SubmitHandler } from 'react-hook-form';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { useLogin } from '../../utils/context/loginContext';
import { LoginForm } from '../../utils/types/user';
import { ROUTES } from '../../utils/const';
import Input from '../Input';
import Button from '../Button';

const Login = () => {
  const { user, logIn, status } = useLogin();

  const isLoading = status === 'pending';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    toast.promise(logIn(data), {
      loading: 'Loading',
      success: 'Login success',
      error: 'Login failed',
    });
    reset();
  };

  useLayoutEffect(() => {
    user && redirect(ROUTES.CHAT);
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-4 flex w-full flex-col justify-center rounded-lg bg-white px-8 pb-8 pt-6 shadow-lg shadow-black md:mx-auto md:w-80'>
      <div className='mb-4'>
        <Input className='px-3 py-2 shadow-lg shadow-wl-blue-2' placeholder='abc@wizeline.com' label='Username' id='userName' register={register} required errors={errors} />
      </div>
      <div className='mb-6'>
        <Input required type='password' className='px-3 py-2 shadow-wl-blue-2' placeholder='abc@wizeline.com' label='Password' id='password' register={register} errors={errors} />
      </div>

      <Button
        type='submit'
        disabled={isLoading}
        icon={IoIosLogIn}
        text='Sing In'
        iconStyles='text-white text-lg border-wl-blue'
        className='border-wl-blue-2 bg-wl-blue px-4 py-2 font-bold text-white shadow shadow-wl-blue-3  hover:bg-wl-blue-2'
      />
    </form>
  );
};

export default Login;
