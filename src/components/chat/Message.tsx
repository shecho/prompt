import clsx from 'clsx';
import React from 'react';
import Markdown from 'react-markdown';

interface Props {
  message: string;
  isOwn?: boolean;
}
const Message = ({ message, isOwn = true }: Props) => {
  const messageStyles = clsx(
    'z-20 w-fit overflow-hidden rounded-t-lg border-b-2 border-r-2 px-3 py-2',
    isOwn ? 'rounded-l-lg border-wl-cyan bg-white text-wl-gray-2' : 'rounded-r-lg border-wl-gray-3 bg-gray-100 text-wl-gray-2'
  );

  return (
    <div className={messageStyles}>
      <Markdown>{message}</Markdown>
    </div>
  );
};

export default Message;
