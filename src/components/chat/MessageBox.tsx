import clsx from 'clsx';
import React from 'react';
import Avatar from '../Avatar';
import { format } from 'date-fns';
import Message from './Message';
import { ChatHistory } from '../../utils/types/chat';
import { useLogin } from '../../utils/context/loginContext';

interface MessageBoxProps {
  chat: ChatHistory;
}
const MessageBox = ({ chat }: MessageBoxProps) => {
  const { user } = useLogin();
  const isOwn = chat.role === 'user';

  const container = clsx('flex items-start gap-2 p-3', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-1', isOwn && 'items-end');

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar isOwn={isOwn} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          <div className='text-sm font-semibold text-gray-500'>{isOwn ? user?.nombre ?? 'Guest' : chat.role ?? 'AI'}</div>
          <div className='text-xs text-gray-400'>{format(new Date(), 'p')}</div>
        </div>
        {<Message isOwn={isOwn} key={chat.content} message={chat?.content} />}
      </div>
    </div>
  );
};

export default MessageBox;
