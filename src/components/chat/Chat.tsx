'use client';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import ToolPicker from './ToolPicker';
import Button from '../Button';
import ChatInput from './ChatInput';
import Conversation from './Conversation';
import { redirect } from 'next/navigation';
import { FormProvider } from 'react-hook-form';
import Tooltip from '../Tooltip';
import { AiFillLike } from 'react-icons/ai';
import { useLogin } from '../../utils/context/loginContext';
import { ROUTES } from '../../utils/const';
import { useChat } from '../../utils/context/chatContext';
import useModal from '../../utils/context/modalContext';

const Chat = () => {
  const { user } = useLogin();
  const { onSubmit, restartChat, methods, conversation } = useChat();
  const { handleSubmit, setFocus } = methods;
  const { openRateModal } = useModal();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    !user && redirect(ROUTES.LOGIN);
  }, [user]);

  useEffect(() => {
    setFocus('user_input');
  }, [setFocus]);

  useLayoutEffect(() => {
    formRef.current?.scrollTo({
      top: formRef.current?.scrollHeight ?? 10000,
      left: 0,
      behavior: 'smooth',
    });
  }, [formRef, conversation.history]);

  return (
    <FormProvider {...methods}>
      <ToolPicker />
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='h-[58svh] overflow-y-auto'>
        <div className='fixed mt-6 flex w-full justify-center space-x-1'>
          <Tooltip message='Restart chat'>
            <Button
              disabled={conversation.history.length === 0}
              onClick={restartChat}
              icon={FiRefreshCcw}
              className='border border-wl-cyan text-wl-cyan shadow-wl-blue-3 hover:bg-wl-cyan hover:text-white'
            />
          </Tooltip>
          {/* <Tooltip message='Rate your experience'>
            <Button onClick={openRateModal} icon={AiFillLike} className='border border-wl-cyan text-wl-cyan shadow-wl-blue-3 hover:bg-wl-cyan hover:text-white' />
          </Tooltip> */}
        </div>
        <Conversation />
        <div className='fixed bottom-0 z-50 flex w-full items-center justify-center md:bottom-4'>
          <ChatInput />
        </div>
      </form>
    </FormProvider>
  );
};

export default Chat;
