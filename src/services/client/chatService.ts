import axios from 'axios';
import { ChatRequest } from '../../utils/types/chat';

const sendPrompt = async (data: ChatRequest) => {
  try {
    const response = await axios.post(`api/chat/`, { ...data, temperature: (data.temperature ?? 20) / 100 });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const chatService = { sendPrompt };

export default chatService;
