'use client';

import React from 'react';
import Link from 'next/link';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import WizeLogo from '../Logo';
import useModal from '../../utils/context/modalContext';
import { ROUTES } from '../../utils/const';

const Header = () => {
  const { openDrawerModal } = useModal();

  return (
    <div className='z-50 w-full bg-wl-blue-2'>
      <div className='flex justify-between px-8 pt-6'>
        <Link href={ROUTES.HOME}>
          <WizeLogo />
        </Link>
        <div className='flex space-x-2'>
          <span className='font-sans font-bold text-white'>Wizeprompt</span>
          {openDrawerModal && <HiEllipsisHorizontal size={32} onClick={openDrawerModal} className='cursor-pointer text-wl-cyan transition hover:text-wl-cyan-2' />}
        </div>
      </div>
    </div>
  );
};

export default Header;
