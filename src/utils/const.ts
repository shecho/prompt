import { MutationStatus } from '@tanstack/react-query';
import { ModelName, ModelType } from './types/chat';
import { User } from './types/user';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CHAT: '/chat',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
} as const;

export const mockUser: User = {
  id: '1',
  email: 'gueest@abc.com',
  nombre: 'Guest',
  image: '/images/placeholder.jpg',
  password: '',
};

const ChatRequestKey = ['model_name', 'user_input', 'history', 'temperature', 'model_type'] as const;
export type ChatRequestKey = (typeof ChatRequestKey)[number];

export const CHAT_MODEL: Record<ModelName, ModelName> = {
  'gpt-3.5-turbo': 'gpt-3.5-turbo',
  wize_q: 'wize_q',
  wize_confluence: 'wize_confluence',
  wize_it_confluence: 'wize_it_confluence',
  'gpt-4': 'gpt-4',
} as const;

export const MODEL_TYPE: Record<ModelType, ModelType> = {
  conversational: 'conversational',
  question_answering: 'question_answering',
  document_generation: 'document_generation',
  non_conversational: 'non_conversational',
} as const;

export const MODEL_OPTIONS = [
  { value: CHAT_MODEL['gpt-3.5-turbo'], label: 'GPT 3.5' },
  { value: CHAT_MODEL['gpt-4'], label: 'GPT 4' },
  { value: CHAT_MODEL.wize_q, label: 'Wize Questions' },
  { value: CHAT_MODEL.wize_confluence, label: 'Confluence' },
  { value: CHAT_MODEL.wize_it_confluence, label: 'IT Confluence' },
];

export const MUTATION_STATUS: Record<string, MutationStatus> = {
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
} as const;
