import axios from 'axios';
import { api } from '../../utils/ConnectionManager';

export const getUserDetailsById = async (userId) => {
  try {
    const response = await axios.post(api + '/get-user-details-by-id', {
      userId,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const checkValidUserWithEmail = async (email) => {
  try {
    const response = await axios.post(api + '/checkValidUserWithEmail', {
      email,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserDetailsById = async (userObject) => {
  try {
    const response = await axios.post(api + '/update-user-details-by-id', {
      ...userObject,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addBulkOrder = async (formParams) => {
  try {
    const response = await axios.post(api + '/add-bulk-order', {
      ...formParams,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const changePassword = async (userData) => {
  try {
    const response = await axios.post(api + '/change-password', {
      ...userData,
    });
    return response;
  } catch (error) {
    console.error('Error in changePassword request:', error.response || error);
    return error.response || null; // Return the error response for more detailed handling
  }
};
