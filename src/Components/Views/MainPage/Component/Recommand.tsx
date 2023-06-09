import { useEffect, useState } from 'react';
import { getRecommand } from '@/Apis/productApi';

export default function Recommand() {
  const [list, setList] = useState();
  async function recommand() {
    try {
      const res = await getRecommand();
      console.log(res.products);
      setList(res.products);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    (async () => {
      await recommand();
    })();
  }, []);
  return (
    <div>
      <h1>Recommand!</h1>
      <div>
        {list &&
          list.map((item) => (
            <div key={item.product_no}>
              <div>{item.product_name}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
