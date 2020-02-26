import axios from 'axios';
import config from '../config';

const httpTransport = () => {
  const token = localStorage.getItem('token');

  const options = {
    baseURL: config.BASE_URL,
    timeout: 3000,
    headers: {}
  };

  if (token) {
    options.headers['Authorization'] = token;
  }

  return axios.create(options);
};

export {httpTransport};