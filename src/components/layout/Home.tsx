'use client';
import Link from 'next/link';
import React from 'react';
import Button from '../Button';
import { ROUTES } from '../../utils/const';

const Home = () => {
  return (
    <>
      <Link href={ROUTES.LOGIN}>
        <Button variant='link' text='Login' className='border border-wl-gray shadow-wl-blue-3' />
      </Link>
    </>
  );
};

export default Home;
