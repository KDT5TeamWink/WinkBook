import { useEffect, useState } from 'react';
import { getRecommand } from '@/Apis/productApi';
import './Recommand.scss';
import { Link } from 'react-router-dom';

type RecommandProducts = RecommandProduct[];

interface RecommandProduct {
  shop_no: number;
  product_no: number;
  product_name: string;
  summary_description: string;
}

export default function Recommand() {
  const [list, setList] = useState<RecommandProducts>();
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
    <div className="recommand">
      <h1>추천도서</h1>
      <div className="recommand-wrapper">
        {list &&
          list.map((item) => (
            <Link
              to={`/detail/${item.product_no}`}
              key={item.product_no}
              className="test"
            >
              <h3>{item.product_name}</h3>
              <p>
                {item.summary_description.length > 85
                  ? item.summary_description.slice(0, 85) + '...'
                  : item.summary_description}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}