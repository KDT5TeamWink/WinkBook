import axios from 'axios';
import { useEffect, useState } from 'react';
import { getList } from '@/Apis/productApi';

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
          <div>tags....</div>
        </div>
      </div>

      <div className="right">
        {list &&
          list.map((item) => (
            <div key={item.product_no} className="book">
              <img src={item.list_image} alt={item.product_name} />
              <div>
                {item.product_name},{item.product_no}
              </div>
              <div>{item.retail_price}</div>
              <div>{item.price}</div>
              {item.main ? item.main.map((v) => <div>{v}</div>) : null}
            </div>
          ))}
      </div>
    </div>
  );
}
