import axios from 'axios';
import { ChatRequest } from '../../utils/types/chat';

const BASE_URL = process.env.CHAT_API_URL;
const CHAT_API_KEY = process.env.CHAT_API_KEY;
const ORIGIN_TOKEN = process.env.ORIGIN_TOKEN;

const chatApiStream = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-key': CHAT_API_KEY,
    'X-Origin-Token': ORIGIN_TOKEN
  },
  maxBodyLength: Infinity
});

const generatePrompt = async (data: ChatRequest) => {
  try {
    const response = await chatApiStream.post(`/generate`, { ...data });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const generateStream = async (data: ChatRequest) => {
  try {

    const response = await fetch(`${BASE_URL}/stream-generate`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-key': CHAT_API_KEY || '',
          'X-Origin-Token': ORIGIN_TOKEN || ''
        },
        body: JSON.stringify({ ...data }),
    })

    // // eslint-disable-next-line no-undef
    const stream = response.body!.pipeThrough(new TextDecoderStream());

    return stream;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const chatApiService = { generateStream, generatePrompt };

export default chatApiService;
