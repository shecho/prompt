import React, { ChangeEvent, FormEvent, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ChatForm, ChatRequest, ChatResponse, ChatHistory, ModelName } from '../types/chat';
import { UseFormReturn, useForm } from 'react-hook-form';
import { useMount, useLocalStorageState, } from 'ahooks';
import { MutationStatus } from '@tanstack/react-query';
import { MUTATION_STATUS } from '../const';
import toast from 'react-hot-toast';
import useModal from './modalContext';
import { SSE } from 'sse.js';
import { useLogin } from './loginContext';
import mutations from '../../services/server/mutations';

export interface ChatContextValue {
  onSubmit: any;
  restartChat: () => void;
  conversation: ChatResponse;
  methods: UseFormReturn<ChatForm, any>;
  status: MutationStatus;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const CHAT_REQUEST_INITIAL_STATE: ChatRequest = {
  model_type: 'conversational',
  model_name: 'gpt-3.5-turbo',
  history: [],
  user_input: null,
  temperature: 0,
};
const INITIAL_STATE = {
  onSubmit: (_e: FormEvent<HTMLFormElement>) => {},
  restartChat: () => {},
  conversation: { history: [] as ChatHistory[], response: '' } as ChatResponse,
  methods: {} as UseFormReturn<ChatForm, any>,
  status: MUTATION_STATUS.IDLE,
  handleSelect: (_e: ChangeEvent<HTMLSelectElement>) => {},
};

export const ChatContext = createContext(INITIAL_STATE);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { openResetModal } = useModal();
  const { user } = useLogin();
  const { email } = user || {};
  const [conversation, setConversation] = useState<ChatResponse>(INITIAL_STATE.conversation);
  const [saveConversation, setSaveConversation] = useLocalStorageState<string | undefined>('conversation');

  const methods = useForm<ChatForm>({ defaultValues: CHAT_REQUEST_INITIAL_STATE });
  const memoizedMethods = useMemo(() => methods, [methods]);
  const { reset } = memoizedMethods;
  const memoizedConversation = useMemo(() => conversation, [conversation]);
  const { mutateAsync: sendConversation, status } = mutations.conversationMutation({ setConversation, reset, setSaveConversation });

  useMount(() => saveConversation && setConversation(JSON.parse(saveConversation)));

  // Todo move to the onsubmit response
  useEffect(() => {
    if (conversation.history.length > 0) {
      setSaveConversation(JSON.stringify(conversation));
    }
  }, [conversation, conversation.history, saveConversation, setSaveConversation]);

  // const onSubmit = useCallback(
  //   async (data: ChatRequest) => {
  //     setConversation((prevConversation) => ({
  //       ...prevConversation,
  //       history: [...prevConversation.history, { role: 'user', content: data.user_input ?? '' }],
  //     }));
  //     sendConversation({ ...data, history: conversation.history ?? [] });
  //   },
  //   [conversation.history, sendConversation]
  // );

  const onSubmit = (data: ChatRequest) => {
    let response = ''; 
    const prevConversation = conversation;
    setConversation((prevConversation) => ({
      ...prevConversation,
      history: [...prevConversation.history, { role: 'user', content: data.user_input ?? '' }],
    }));
    reset({ user_input: '' });

    const source = new SSE("api/stream/", {
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({ ...data, user_email: email, history: conversation.history ?? [], temperature: (data.temperature ?? 0) / 100 })
    });

    source.addEventListener('token', function(e: { data: string; }) {
      response += e.data
      setConversation({response: response, history: [...prevConversation.history, { role: 'user', content: data.user_input ?? '' }, { role: 'assistant', content: response }]})
    });
    source.addEventListener('reference', function(e: { data: string; }) {
      response += "\n\r"
      response += ` **Reference**: ${e.data}`
      setConversation({response: response, history: [...prevConversation.history, { role: 'user', content: data.user_input ?? '' }, { role: 'assistant', content: response }]})
    });
    source.stream();
  }

  const restartChat = useCallback(async () => {
    const resetPromise = new Promise<void>((resolve, reject) => {
      try {
        setTimeout(() => {
          reset({ user_input: '' });
          setConversation(INITIAL_STATE.conversation);
          setSaveConversation(undefined);
          resolve();
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });

    // setSaveConversation();
    toast.promise(resetPromise, {
      loading: 'Loading',
      success: 'Chat restarted',
      error: 'Something went wrong',
    });
  }, [reset, setSaveConversation]);
  const handleSelect = useCallback(
    (_e: ChangeEvent<HTMLSelectElement>) => {
      conversation.history.length > 0 && openResetModal();
    },
    [conversation.history.length, openResetModal]
  );
  const chatValue: ChatContextValue = {
    onSubmit,
    restartChat,
    conversation: memoizedConversation,
    methods: memoizedMethods,
    status,
    handleSelect,
  };

  return <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextValue => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginContextProvider');
  }
  return context;
};

export default ChatContext;
