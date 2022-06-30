import axios from 'axios';
import { getItem } from "./localStorageControl";


const token = getItem('Auth');
export default axios.create({
  baseURL: 'https://api.steamseo.com',
  headers: {
    'Content-type': 'application/json',
    'X-Auth-Key': 'zxMNGo9TEK3Vb9pSRGW2FDuXxs0Md8',
    Authorization: token ? 'Bearer '+token.access_token:null,
  },
});