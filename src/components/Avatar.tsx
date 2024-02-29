'use client';

import React from 'react';
import Image from 'next/image';
import { useLogin } from '../utils/context/loginContext';

const Avatar = ({ isOwn = true }: { isOwn?: boolean }) => {
  const { user } = useLogin();
  const isActive = !!user?.id;

  return (
    <div className='relative'>
      <div className='relative inline-block overflow-hidden rounded-full md:h-11 md:w-11'>
        {isOwn ? <Image sizes='30' fill src={user?.image ?? '/images/placeholder.jpg'} alt='Avatar' /> : <Image sizes='30' fill src='/images/wizeline-logo.svg' alt='Avatar' />}
      </div>
      {isActive && isOwn ? <span className='absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3' /> : null}
    </div>
  );
};

export default Avatar;
