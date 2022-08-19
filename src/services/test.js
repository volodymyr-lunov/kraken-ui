import {API} from 'aws-amplify';

export const getTest = () => API.get('api', '/test')
