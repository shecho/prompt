import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';
import userService from '../client/userService';
import chatService from '../client/chatService';
import { UseFormReset } from 'react-hook-form';
import { ChatForm, ChatResponse } from '../../utils/types/chat';

interface LoginMutation {
  setLogIn: () => void;
  setSave: (value: string) => void;
}
const LoginMutation = ({ setLogIn, setSave }: LoginMutation) => {
  return useMutation({
    mutationFn: userService.login,
    onSuccess: () => {
      setLogIn();
      setSave('true');
    },
    onError: (error) => console.error(error),
  });
};

interface ConversationMutation {
  setConversation: Dispatch<SetStateAction<ChatResponse>>;
  reset: UseFormReset<ChatForm>;
  setSaveConversation: (value?: string | undefined) => void;
}
const ConversationMutation = ({ setConversation, reset, setSaveConversation }: ConversationMutation) => {
  return useMutation({
    mutationFn: chatService.sendPrompt,
    onSuccess: (response: string) => {
      setConversation((prevConversation) => ({
        ...prevConversation,
        history: [...prevConversation.history, { role: 'assistant', content: response, response }],
      }));
      // setSaveConversation(JSON.stringify(data)); // fix this
      reset({ user_input: '' });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const mutations = { loginMutation: LoginMutation, conversationMutation: ConversationMutation };
export default mutations;
