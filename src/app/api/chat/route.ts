import { NextRequest } from 'next/server';
import chatApiService from '../../../services/server/chatApiService';
import { ChatResponse } from '../../../utils/types/chat';

export async function POST(request: NextRequest) {
  const { generatePrompt } = chatApiService;

  const body = await request.json();
  const res: Omit<ChatResponse, 'history'> = await generatePrompt({ ...body });

  if (!res) return Response.json({ error: 'No response' }, { status: 401 });

  return Response.json(res.response, { status: 200 });
}
