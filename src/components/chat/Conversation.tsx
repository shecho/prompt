import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';
import { useChat } from '../../utils/context/chatContext';

const MessageBox = dynamic(() => import('./MessageBox'), {
  loading: () => <Skeleton />,
});

const Conversation = () => {
  const {
    conversation: { history },
  } = useChat();

  return (
    <div className='mx-auto min-h-full max-w-7xl text-xs md:h-auto  md:text-sm'>
      <>{Array.isArray(history) && history.map((chat) => <MessageBox key={chat.content + chat.role} chat={chat} />)}</>
    </div>
  );
};

export default Conversation;
