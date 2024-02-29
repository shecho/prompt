import { NextRequest, NextResponse } from 'next/server';
import chatApiService from '../../../services/server/chatApiService';


export async function POST(request: NextRequest) {
  const { generateStream } = chatApiService;
  const body = await request.json();

  const reader: ReadableStream<string> = await generateStream({ ...body })
  const res = new NextResponse(reader, {
    status: 200,
  });

  return res
}
