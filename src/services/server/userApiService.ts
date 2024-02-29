import axios from 'axios';
import { User } from '../../utils/types/user';

const BASE_URL = process.env.USER_API_URL;

const userApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: include interceptor to add token to requester

const getUser = async () => {
  const response = await userApi.get('/empleado/GetEmpleadoLogin');
  return response.data;
};

const login = async (userName: string, password: string) => {
  try {
    const response = await userApi.get<User>(`/login/${userName}/${password}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const userApiService = { getUser, login };
export default userApiService;
