'use client';

import React from 'react';
import { Dialog } from '@headlessui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import Modal from './Modal';
import Button from '../Button';
import useModal from '../../utils/context/modalContext';

interface ConfirmModalProps {
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal = ({ onConfirm, title, message }: ConfirmModalProps) => {
  const { confirmModal, closeConfirmModal } = useModal();

  return (
    <Modal isOpen={confirmModal} onClose={closeConfirmModal}>
      <div className='mt-3 flex items-center space-x-3'>
        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
          <FiAlertTriangle className='h-6 w-6 text-red-600' aria-hidden='true' />
        </div>
        <div className='mt-3 flex w-full flex-col items-center md:items-start'>
          <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-900'>
            {title}
          </Dialog.Title>
          <p className='text-sm text-gray-500'>{message}</p>
        </div>
      </div>
      <div className='mt-5 flex justify-center space-x-4 md:justify-end'>
        <Button className='border-green-600 bg-green-600 text-white shadow-wl-blue-3' text='Confirm' onClick={onConfirm} />
        <Button className='border-wl-red bg-wl-red text-white shadow-wl-blue-3' text='Cancel' onClick={closeConfirmModal} />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
