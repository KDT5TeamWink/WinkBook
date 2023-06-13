import axios from 'axios';

const { VITE_CLIENT_ID } = import.meta.env;

const ajax = axios.create({
  baseURL: '/cafe24',
  headers: {
    'Content-Type': 'application/json',
    'X-Cafe24-Api-Version': '2023-03-01',
    'X-Cafe24-Client-Id': VITE_CLIENT_ID,
  },
});

export async function getList(category: number) {
  try {
    const { data } = await ajax.get('/products', {
      params: {
        category: category,
      },
    });
    //console.log(data.products);
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