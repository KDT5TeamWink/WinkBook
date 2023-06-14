import { Link } from 'react-router-dom';
import { useState } from 'react';

interface Props {
  productNo: number;
  productImg: string;
  productName: string;
  retailPrice: string;
  price: string;
  summary: string;
}

export default function BookInfo({
  productNo,
  productImg,
  productName,
  retailPrice,
  price,
  summary,
}: Props) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={`detail/${productNo}`}
      key={productNo}
      className="book"
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {hover && <div className="hover-description">{summary}</div>}
      {retailPrice !== price ? (
        <div className="discount">
          {+retailPrice / (+retailPrice - +price)}%
        </div>
      ) : null}

      <img src={productImg} alt={productName} />
      <h4>{productName}</h4>
      {retailPrice === price ? (
        <div>{price.slice(0, -3)}원</div>
      ) : (
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="retail-price">{retailPrice.slice(0, -3)}원</div>
          <div>{price.slice(0, -3)}원</div>
        </div>
      )}
    </Link>
  );
}
