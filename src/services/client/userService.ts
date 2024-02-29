import axios from 'axios';
import { LoginForm } from '../../utils/types/user';

const login = async (data: LoginForm) => {
  try {
    const response = await axios.post(`api/login/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const userService = { login };

export default userService;
