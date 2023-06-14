import React, { useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import YearBox from '@/Common/section/number';
import './CartItems.scss';

interface BuyItem {
  id: number;
  product_name: string;
  price: number;
  detail_image: string;
}

interface CartItemsProps {
  check: number[];
  pitem: any;
  setItems:any;

}

const CartItems = ({ check, pitem, setItems }: CartItemsProps) => {
  const [info, setInfo] = useState([]);
  const [buyItem, setbuyItem] = useState<BuyItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>(check);


  useEffect(() => {
    BuyCart();
  }, []);

  const BuyCart = () => {
    const BuyItems = JSON.parse(localStorage.getItem("cart")) || [];
    setbuyItem(BuyItems);
    console.log(BuyItems)
  }

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValue = event.target.checked;
    const updatedCheckedItems = checkedValue
      ? buyItem.map((item) => item.id)
      : [];
    setCheckedItems(updatedCheckedItems);  
  };

  const handleChange2 = (el: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(el);
    const itemId = parseInt(event.target.name);
    let updatedCheckedItems: number[] = [];
    let updatedItems: any[] = [];
    if (event.target.checked) {
      updatedCheckedItems = [...checkedItems, itemId];
      updatedItems = [...pitem , el];
    } else {
      updatedCheckedItems = checkedItems.filter((id) => id !== itemId);
      updatedItems = pitem.filter((key) => key.product_no !== el.product_no);
    } 
    setItems(updatedItems);
    setCheckedItems(updatedCheckedItems);
    setCheck(updatedCheckedItems);
  };

  const children = (el:any ,index:number) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ml: 3,
        fontSize: 'large',
      }}>
      <FormControlLabel
        label=""
        control={
          <Checkbox
            checked={checkedItems.includes(index)}
            onChange={handleChange2(el)}
            name={index}
          />
        }
      />
    </Box>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log();
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const RemoveBuyItem = (index: number, key:any) => {
    console.log(key);
    const confirmation = window.confirm('삭제하시겠습니까?');
    if (confirmation) {

      const updatedCartData = JSON.parse(localStorage.getItem('cart'));
      localStorage.setItem('cart', JSON.stringify(updatedCartData.filter((item) => item.product_no !== key)));
      
      const updatedBuyItem = [...buyItem];
      //선택한 index 1개를 buyItem 배열에서 제거.
      updatedBuyItem.splice(index, 1);
      // 제거한후의 값 setState 갑에 담아줌.
      setbuyItem(updatedBuyItem);
      // cart 키 값으로 로컬에서 데이터 찾아옴
      alert('삭제되었습니다.');
    } else {
      alert('취소되었습니다.');
    }
  };

  return (
    <>
      <div className="CartPageTable__Buy">
        <FormControlLabel
          label=""
          control={
            <div className="LableBox">
              <Checkbox
                size="large"
                checked={checkedItems.length === buyItem.length}
                indeterminate={
                  checkedItems.length > 0 && checkedItems.length < buyItem.length
                }
                onChange={handleChange1}
              />
            </div>
          }
        />

        <div className="ProductNameBox">
          <span>상품명</span>
        </div>

        <div className="PriceNameBox">
          <p>가격</p>
        </div>

        <div className="DeleteNameBox">
          <span>보관/삭제</span>
        </div>
      </div>

      <div className="ItemsContainer">
        {buyItem.map((el, index) => (
          <div className="ItemContainer" key={index}>
            {/* 아이템 체크 하는 부분 */}
            <div className="CheckContainer">{children(el, index)}</div>
            <div key={el.id} className="ImageBox">
              <img src={el.detail_image} alt="cartbookimage" />
            </div>
            <div className="TextInner">
              <span>{el.product_name}</span>
            </div>

            <div className="PriceInner">
              <span>{Number(el.price).toFixed(0)}원</span>
            </div>

            <div className="CartButtonBox">
              <button onClick={() => RemoveBuyItem(index, el.product_no)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default CartItems;
