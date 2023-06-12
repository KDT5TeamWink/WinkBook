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
  const [recommandBook, setRecommandBook] = useState('');
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
        <div>
          {list &&
            list.map((item) => (
              <div
                key={item.product_name}
                onClick={() => {
                  setRecommandBook(item.product_name);
                }}
                className={`title ${
                  recommandBook === item.product_name ? 'selected' : ''
                }`}
              >
                {item.product_name}
              </div>
            ))}
        </div>

        <div className="description">
          {list &&
            list.map((item) => {
              if (recommandBook === item.product_name) {
                return (
                  <>
                    {item.summary_description}
                    <Link to={`/detail/${item.product_no}`}>책 살펴보기</Link>
                  </>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}
