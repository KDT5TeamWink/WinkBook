import axios from "axios";

const { VITE_IMP_KEY, VITE_IMP_SECERET } = import.meta.env;

export const ajax = axios({
  url: '/users/getToken',
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  data: {
    imp_key: VITE_IMP_KEY,
    imp_secret: VITE_IMP_SECERET,
  },
});
