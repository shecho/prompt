'use client';

import React from 'react';
import Button from '../Button';
import Modal from './Modal';
import { Dialog } from '@headlessui/react';
import Rating from '../chat/Rating';
import useModal from '../../utils/context/modalContext';

interface Props {
  title?: string;
  message?: string;
}
const RatingModal = ({}: Props) => {
  const { rateModal, closeRateModal } = useModal();

  return (
    <Modal isOpen={rateModal} onClose={closeRateModal}>
      <div className='mt-3 flex w-full flex-col md:items-start'>
        <div className='flex flex-col space-y-2'>
          <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-900'>
            Rate your experience with Wizeprompt
          </Dialog.Title>
          <div className='flex space-x-1'>
            <Rating />
          </div>
          <p className='text-sm text-gray-500'>question 1</p>
          <p className='text-sm text-gray-500'>question 2</p>
          <p className='text-sm text-gray-500'>question 3</p>
        </div>
        <div className='mt-5 flex w-full space-x-4 md:justify-end'>
          <Button disabled={true} className='border-wl-blue bg-transparent text-wl-blue-2 shadow-wl-blue-3' text='Skip' onClick={closeRateModal} />
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
