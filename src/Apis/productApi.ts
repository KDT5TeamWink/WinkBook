import axios from 'axios';

const { VITE_CLIENT_ID, VITE_IMP_KEY, VITE_IMP_SECRET } = import.meta.env;

const ajax = axios.create({
  baseURL: '/cafe24',
  headers: {
    'Content-Type': 'application/json',
    'X-Cafe24-Api-Version': '2023-03-01',
    'X-Cafe24-Client-Id': VITE_CLIENT_ID,
  },
});

interface GetList {
  category?: number;
  product_no?: string;
  limit?: number;
}
export async function getList(info: GetList) {
  try {
    const { data } = await ajax.get('/products', {
      params: {
        display: 'T',
        selling: 'T',
        category: info.category,
        product_no: info.product_no,
        limit: info.limit
      },
    });
    return data.products;
  } catch (err) {
    console.log(err);
  }
}

export async function getRecommand() {
  try {
    const res = await ajax.get('/mains/2/products');
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getDetail(product_no: string) {
  try {
    const res = await ajax.get(`/products/${product_no}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const MypageToken = async  () => {

  const response = await axios.post('/iamport/users/getToken',
    {
      imp_key: VITE_IMP_KEY,
      imp_secret: VITE_IMP_SECRET,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const accessToken = response.data.response.access_token;
  return accessToken;  
}