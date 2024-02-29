import { CHAT_MODEL } from '../const';

export interface ChatResponse {
  history: ChatHistory[];
  response: string;
}

export type Role = 'user' | 'assistant';

export interface ChatHistory {
  role: Role;
  content: string;
}

export type ModelName = 'wize_q' | 'wize_confluence' | 'wize_it_confluence' | 'gpt-3.5-turbo' | 'gpt-4';
export type ModelType = 'conversational' | 'non_conversational' | 'question_answering' | 'document_generation';
export interface ChatModel {
  value: (typeof CHAT_MODEL)[keyof typeof CHAT_MODEL];
  label: string;
}

export interface ChatRequest {
  model_name: ModelName;
  user_input: string | null;
  history?: ChatHistory[];
  model_type?: ModelType;
  temperature?: number;
}
export type ChatRequestValue = ChatRequest[keyof ChatRequest];
export type ChatRequestKey = keyof ChatRequest;
export interface ChatForm extends ChatRequest {}
