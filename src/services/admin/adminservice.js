import axios from 'axios';
import { api } from '../../utils/ConnectionManager';

export const checkValidAdminUser = async (id) => {
  try {
    const response = await axios.post(
      api + '/admin/check-valid-admin-with-userid',
      {
        id: id,
      }
    );
    if (response && response?.data) {
      return response?.data?.success;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const getAdminUserDetails = async (id) => {
  try {
    const response = await axios.post(api + '/admin/get-admin-user-details', {
      id: id,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const adminSignIn = async (userId, password) => {
  try {
    const response = await axios.post(api + '/admin/sign-in', {
      userId,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getEmployeeAllOrders = async (id) => {
  try {
    const response = await axios.post(api + '/admin/get-employee-all-orders', {
      id,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getEmployeeAllContactus = async (id) => {
  try {
    const response = await axios.post(
      api + '/admin/get-employee-all-contactus',
      {
        id,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getEmployeeAllBulkorders = async (id) => {
  try {
    const response = await axios.post(
      api + '/admin/get-employee-all-bulkorders',
      {
        id,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getAllOrders = async () => {
  try {
    const response = await axios.post(api + '/admin/get-all-orders');
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getAllUsers = async () => {
  try {
    const response = await axios.get(api + '/get-all-users');
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getAllContactus = async () => {
  try {
    const response = await axios.post(api + '/admin/get-all-contactus');
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const updateContactusDetails = async (obj) => {
  try {
    const response = await axios.post(api + '/admin/update-contactus-details', {
      ...obj,
    });
    return response;
  } catch (error) {
    console.error(
      'Error in update-contactus request:',
      error.response || error
    );
    return error.response || null;
  }
};
export const updateBulkOrdersDetails = async (obj) => {
  try {
    const response = await axios.post(
      api + '/admin/update-bulk-orders-details',
      {
        ...obj,
      }
    );
    return response;
  } catch (error) {
    console.error(
      'Error in update-bulk-orders-details request:',
      error.response || error
    );
    return error.response || null;
  }
};
export const updateAssigntoForOrder = async (obj) => {
  try {
    const response = await axios.post(
      api + '/admin/update-assignto-for-order',
      {
        ...obj,
      }
    );
    return response;
  } catch (error) {
    console.error(
      'Error in update-assignto-for-order request:',
      error.response || error
    );
    return error.response || null;
  }
};
export const updateAssigntoForContactUs = async (obj) => {
  try {
    const response = await axios.post(
      api + '/admin/update-assignto-for-contactus',
      {
        ...obj,
      }
    );
    return response;
  } catch (error) {
    console.error(
      'Error in update-assignto-for-contactus request:',
      error.response || error
    );
    return error.response || null;
  }
};
export const updateAssigntoForBulkOrders = async (obj) => {
  try {
    const response = await axios.post(
      api + '/admin/update-assignto-for-bulkorders',
      {
        ...obj,
      }
    );
    return response;
  } catch (error) {
    console.error(
      'Error in update-assignto-for-bulkorders request:',
      error.response || error
    );
    return error.response || null;
  }
};
export const updateOrderStatus = async (obj) => {
  try {
    const response = await axios.post(api + '/admin/update-state-for-order', {
      ...obj,
    });
    return response;
  } catch (error) {
    console.error(
      'Error in update-state-for-order request:',
      error.response || error
    );
    return error.response || null;
  }
};
export const getAllAdminEmployees = async () => {
  try {
    const response = await axios.get(api + '/admin/get-all-admin-users');
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getAllBulkOrders = async () => {
  try {
    const response = await axios.post(api + '/admin/get-all-bulk-orders');
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addEmployeeService = async (name, userId, password) => {
  try {
    const obj = { name, userId, password, role: 'Employee' };
    const response = await axios.post(api + '/admin/register-admin-user', {
      ...obj,
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const addProduct = async (finalObject) => {
  try {
    const response = await axios.post(api + '/add-new-product', finalObject);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.post(api + '/get-all-product');
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProductById = async () => {
  try {
    const response = await axios.post(api + '/get-product-by-id');
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
