import axios from 'axios';
import { api } from '../../utils/ConnectionManager';

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(api + '/sign-in', { email, password });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(api + '/register-user', { ...userData });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const contactus = async (userData) => {
  try {
    const response = await axios.post(api + '/contactus', { ...userData });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const checkValidUser = async (id) => {
  try {
    const response = await axios.post(api + '/checkValidUserWithUserId', {
      user_id: id,
    });
    if (response && response?.data) {
      return response?.data?.success;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
