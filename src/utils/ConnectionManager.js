const isDev = false;

const ip = isDev ? 'localhost' : '13.200.163.83';
const port = '4000';
const baseUrl = '/api/ecommerce/server';

export const api = `http://${ip}:${port}${baseUrl}`;

export const payemntOrderUrl = `${api}/payment/create-order`;

export const paymentVerificationUrl = `${api}/payment/verify-payment`;
