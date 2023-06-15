import axios from 'axios';
import { useEffect, useState } from 'react';
import { getList } from '@/Apis/productApi';
import './Genre.scss';
import BookInfo from './BookInfo';

interface Props {
  type: string;
  number: number;
}

export default function Genre({ category }: { category: Props }) {
  const [list, setList] = useState<Products>([] as Products);
  async function sortByCategory() {
    const data = await getList(category.number);
    setList(data);
  }
  useEffect(() => {
    (async () => {
      await sortByCategory();
    })();
  }, []);

  return (
    <div className="books">
      <div className="left">
        <div className="tag-box">
          <h1 id={category.type}>{category.type}</h1>
          {/* <div>tags....</div> */}
        </div>
      </div>

      <div className="right">
        <img className='Top-bookContainer' src="./public/images/Group 8.png"/>
        {list &&
          list.map((item) => (
            <>
            {/* <img className='Bottom-bookContainer' src="./public/images/Group 8.png"/> */}
            <BookInfo
              key={item.product_no}
              productNo={item.product_no}
              productImg={item.list_image}
              productName={item.product_name}
              retailPrice={item.retail_price}
              price={item.price}
              summary={item.summary_description}
            />
            {/* <div className='bottombook'>
              <img src="./public/images/Group 8.png"/>
            </div> */}
            {/* {Array.from({ length: 1 }).map((_, index) => (
              <div className='bottomImage-container'>
              <img
                key={index}
                src="./public/images/Group 8.png"
              />
              </div>
            ))} */}
            </>
          ))}
          <img className='Bottom-bookContainer' src="./public/images/Group 8.png"/>
      </div>
    </div>
  );
}
