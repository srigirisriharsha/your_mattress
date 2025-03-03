import axios from 'axios';
import { api } from '../../utils/ConnectionManager';

export const fetchUserWishLists = async (userId) => {
  try {
    const response = await axios.post(api + '/get-wishlist-by-id', { userId });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const checkProductInCartById = async (userId, productId) => {
  try {
    const response = await axios.post(api + '/check-product-in-cart-by-id', {
      userId,
      productId,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getProductInCartById = async (userId, productId) => {
  try {
    const response = await axios.post(api + '/get-product-in-cart-by-id', {
      userId,
      productId,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const addMultipleProductToCartById = async (productsByUser) => {
  try {
    const response = await axios.post(api + '/add-multiple-products-to-cart', {
      productsByUser,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const uploadImage = async (formData) => {
  try {
    const response = await axios.post(api + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const addProductToOrdersById = async (params) => {
  try {
    const response = await axios.post(api + '/add-product-in-orders-by-id', {
      ...params,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addProductToCartById = async (
  productId,
  userId,
  quantity,
  category,
  size,
  thickness,
  price,
  categoryPrice,
  thicknessPrice,
  sizePrice
) => {
  try {
    const response = await axios.post(api + '/add-product-to-cart', {
      productId,
      userId,
      quantity,
      category,
      size,
      thickness,
      price,
      categoryPrice,
      thicknessPrice,
      sizePrice,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const addProductToUserWishList = async (userId, productId) => {
  try {
    const response = await axios.post(api + '/add-product-to-wishlist', {
      userId,
      productId,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getCartById = async (userId) => {
  try {
    const response = await axios.post(api + '/get-cart-by-id', {
      userId,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getProductInOrderById = async (userId) => {
  try {
    const response = await axios.post(api + '/get-product-in-order-by-id', {
      userId,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getWishListById = async (userId) => {
  try {
    const response = await axios.post(api + '/get-wishlist-by-id', {
      userId,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteWishlistById = async (userId, productId) => {
  try {
    const response = await axios.post(api + '/delete-wishlist-by-id', {
      userId,
      productId,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteAllProductsInWishlistById = async (userId) => {
  try {
    const response = await axios.post(
      api + '/delete-all-products-in-wishlist-by-id',
      {
        userId,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteCartById = async (userId, productId) => {
  try {
    const response = await axios.post(api + '/delete-cart-by-id', {
      userId,
      productId,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteAllProductsCartById = async (userId) => {
  try {
    const response = await axios.post(api + '/delete-all-products-cart-by-id', {
      userId,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const updateOrderStatus = async (obj) => {
  try {
    const response = await axios.post(api + '/update-state-for-order', {
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
