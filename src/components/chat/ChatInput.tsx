import React from 'react';
import Button from '../Button';
import { AiOutlineSend } from 'react-icons/ai';
import Input from '../Input';
import { useChat } from '../../utils/context/chatContext';
import { MUTATION_STATUS } from '../../utils/const';

const DEFAULT_MESSAGE = 'How can I help you today?';

const ChatInput = () => {
  const { methods, status } = useChat();
  const {
    register,
    formState: { errors },
  } = methods;

  const isLoading = status === MUTATION_STATUS.PENDING;

  return (
    <div className='flex w-full flex-col bg-wl-blue py-4 opacity-90 md:w-7/12 md:rounded-2xl md:px-6'>
      <label htmlFor='question' className='px-2 font-sans font-bold text-wl-cyan-2 md:text-xs'>
        {DEFAULT_MESSAGE}
      </label>
      <div className='flex items-center space-x-4'>
        <Input
          required
          disabled={isLoading}
          id='user_input'
          className='w-full border-b border-x-wl-blue border-t-wl-blue bg-wl-blue px-2 text-white focus:outline-none active:outline-none'
          placeholder='Type your prompt'
          register={register}
          errors={errors}
        />
        <Button
          iconStyles='bg-wl-cyan text-white rounded-full h-8 p-2 w-auto'
          disabled={isLoading}
          type='submit'
          icon={AiOutlineSend}
          className='border border-wl-blue text-white'
        />
      </div>
    </div>
  );
};
export default ChatInput;
