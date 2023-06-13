import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import YearBox from '@/Common/section/number';
import './CartItems.scss';

function CartItems() {
  interface Item {
    id: number;
    // image:string;
    name: string;
    text: string;
    price: string;
    sale: string;
    malize: string;
  }

  const [info, setInfo] = useState([]);
  const [checked, setChecked] = useState([true, false]);
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: '[국내도서]시작하세요! C# 10프로그래밍',
      text: '*밤 11시 잠들기전 배송',
      price: '정가: 36000',
      sale: '판매가:32,400',
      malize: '마일리지: 1,800원',
    },
    {
      id: 2,
      name: '도서명2',
      text: '*밤 11시 잠들기전 배송',
      price: '정가: 36000',
      sale: '판매가:32,400',
      malize: '마일리지: 1,800원',
    },
    {
      id: 3,
      name: '도서명3',
      text: '*밤 11시 잠들기전 배송',
      price: '정가: 36000',
      sale: '판매가:32,400',
      malize: '마일리지: 1,800원',
    },
    {
      id: 4,
      name: '도서명3',
      text: '*밤 11시 잠들기전 배송',
      price: '정가: 36000',
      sale: '판매가:32,400',
      malize: '마일리지: 1,800원',
    },
    {
      id: 5,
      name: '도서명3',
      text: '*밤 11시 잠들기전 배송',
      price: '정가: 36000',
      sale: '판매가:32,400',
      malize: '마일리지: 1,800원',
    },
  ]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValue = event.target.checked;
    const updatedCheckedItems = checkedValue
      ? items.map((item) => item.id)
      : [];
    setCheckedItems(updatedCheckedItems);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = parseInt(event.target.name);
    let updatedCheckedItems: number[] = [];

    if (event.target.checked) {
      updatedCheckedItems = [...checkedItems, itemId];
    } else {
      updatedCheckedItems = checkedItems.filter((id) => id !== itemId);
    }
    setCheckedItems(updatedCheckedItems);
  };

  const children = (itemId: number) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ml: 3,
        fontSize: 'large',
      }}
    >
      <FormControlLabel
        label=""
        control={
          <Checkbox
            checked={checkedItems.includes(itemId)}
            onChange={handleChange2}
            name={itemId.toString()}
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

  return (
    <>
      <div className="CartPageTable__Buy">
        <FormControlLabel
          label=""
          control={
            <div className="LableBox">
              <Checkbox
                size="large"
                checked={checkedItems.length === items.length}
                indeterminate={
                  checkedItems.length > 0 && checkedItems.length < items.length
                }
                onChange={handleChange1}
              />
            </div>
          }
        />

        {/* <div className="Product-Buy">
        <span>구매</span>
      </div> */}

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
        {items.map((item) => (
          <div className="ItemContainer">
            <div className="CheckContainer">{children(item.id)}</div>
            <div key={item.id} className="ImageBox">
              <img src="/images/cartbookimage.jpg" alt="cartbookimage" />
            </div>
            <div className="TextInner">
              <span>{item.name}</span>
              <span>{item.text}</span>
            </div>

            <div className="PriceInner">
              <span>{item.price}</span>
              <span>{item.sale}</span>
              <span>{item.malize}</span>
            </div>

            <div className="CartButtonBox">
              <button>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default CartItems;
