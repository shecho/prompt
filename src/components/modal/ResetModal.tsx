'use client';

import React, { useCallback } from 'react';
import Button from '../Button';
import Modal from './Modal';
import { Dialog } from '@headlessui/react';
import useModal from '../../utils/context/modalContext';
import { useChat } from '../../utils/context/chatContext';

interface Props {
  title?: string;
  message?: string;
}
const ResetModal = ({}: Props) => {
  const { resetModal, closeResetModal } = useModal();
  const { restartChat } = useChat();

  const handleConfirm = useCallback(() => {
    restartChat();
    closeResetModal();
  }, [closeResetModal, restartChat]);

  return (
    <Modal isOpen={resetModal} onClose={closeResetModal}>
      <div className='mt-3 flex w-full flex-col md:items-start'>
        <div className='flex flex-col space-y-2'>
          <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-900'>
            Changing the model will reset the chat history. Do you want to continue?
          </Dialog.Title>
          <div className='flex space-x-1'></div>
        </div>
        <div className='mt-5 flex w-full space-x-4 md:justify-end'>
          <Button className='border-green-600 bg-green-600 text-white shadow-wl-blue-3' text='Confirm' onClick={handleConfirm} />
          <Button className='border-wl-red bg-wl-red text-white shadow-wl-blue-3' text='Cancel' onClick={closeResetModal} />
        </div>
      </div>
    </Modal>
  );
};

export default ResetModal;
