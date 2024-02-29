import { NextRequest } from 'next/server';
import userApiService from '../../../services/server/userApiService';

export async function POST(request: NextRequest) {
  const { login } = userApiService;
  const body = await request.json();
  const res = await login(body.userName, body.password);
  if (res.email !== body.userName || res.password !== body.password) return Response.json({ error: 'Invalid credentials' }, { status: 401 });

  return Response.json(res);
}
