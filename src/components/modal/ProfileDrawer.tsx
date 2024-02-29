'use client';

import React from 'react';
import { Fragment, useMemo, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoClose, IoLogOutOutline } from 'react-icons/io5';
import ConfirmModal from './ConfirmModal';
import Avatar from '../Avatar';
import { useLogin } from '../../utils/context/loginContext';
import useModal from '../../utils/context/modalContext';

const ProfileDrawer = () => {
  const { drawerModal, closeDrawerModal, openConfirmModal } = useModal();
  const { user, logOut } = useLogin();
  const { nombre, email } = user || {};

  const title = useMemo(() => nombre, [nombre]);
  let completeButtonRef = useRef(null);

  const statusText = useMemo(() => (nombre ? 'Active' : 'Offline'), [nombre]);

  return (
    <div>
      <Transition.Root show={drawerModal} as={Fragment}>
        <Dialog initialFocus={completeButtonRef} as='div' className='relative z-50' onClose={closeDrawerModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black opacity-40' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                    <div className='flex h-full flex-col bg-white py-6 shadow-xl'>
                      <div className='px-4 sm:px-6'>
                        <div className='flex items-start justify-end'>
                          <div className='ml-3 flex h-7 items-center'>
                            <button
                              ref={completeButtonRef}
                              type='button'
                              className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                              onClick={closeDrawerModal}
                            >
                              <span className='sr-only'>Close panel</span>
                              <IoClose size={24} aria-hidden='true' />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                        <div className='flex flex-col items-center'>
                          <div className='mb-2'>{<Avatar />}</div>
                          <div>{title}</div>
                          <div className='text-sm text-gray-500'>{statusText}</div>
                          <div className='my-8 flex gap-10'>
                            <div onClick={openConfirmModal} className='flex cursor-pointer flex-col items-center gap-3 hover:opacity-75'>
                              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100'>
                                <IoLogOutOutline size={20} />
                              </div>
                              <div className='text-sm font-light text-neutral-600'>LogOut</div>
                            </div>
                          </div>
                          <div className='w-full py-5 sm:px-0 sm:pt-0'>
                            <dl className='space-y-8 px-4 sm:space-y-6 sm:px-6'>
                              {email && (
                                <div>
                                  <dt className='text-sm font-medium text-gray-500  sm:w-40 sm:shrink-0'> Email </dt>
                                  <dd className='mt-1 text-sm text-gray-900  sm:col-span-2'>{email}</dd>
                                </div>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ConfirmModal onConfirm={logOut} title='Log out' message='Are you sure you want to log out?' />
    </div>
  );
};

export default ProfileDrawer;
