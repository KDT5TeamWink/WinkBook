import React from "react"
import { useState } from "react";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
//import YearBox from "Common/section/number";
// import './CartItems.scss'
import './CartRent.scss'

function RentalItems() {

  interface Item {
    id: number;
    // image:string;
    name: string;
    text: string;
    rentprice: string;
    day:string;
  }

  const [checked, setChecked] = useState([true, false]);
  const [items, setItems] = useState<Item[]>([
    { id: 1,  name: '[국내도서]코어 자바스크립트', text:"*+2추가 대여 이벤트 진행", 
    rentprice:"대여가: 18000", day:"7일"},
    { id: 2,  name: '[국내도서]코어 자바스크립트', text:"*+2추가 대여 이벤트 진행", 
    rentprice:"대여가: 18000", day:"7일"},
    { id: 3,  name: '[국내도서]코어 자바스크립트', text:"*+2추가 대여 이벤트 진행", 
    rentprice:"대여가: 18000", day:"7일"},
    { id: 4,  name: '[국내도서]코어 자바스크립트', text:"*+2추가 대여 이벤트 진행", 
    rentprice:"대여가: 18000", day:"7일"},
    
  ]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValue = event.target.checked;
    const updatedCheckedItems = checkedValue ? items.map((item) => item.id) : [];
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
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, fontSize: 'large' }}>
      <FormControlLabel
        label=""
        control={<Checkbox checked={checkedItems.includes(itemId)} onChange={handleChange2} name={itemId.toString()} />}
      />
    </Box>
  );


  return(
    <>
    <div className="RentPageTable">
      <FormControlLabel
        label=""
        control={
          <div className='Rent-LableBox'>
            <Checkbox
            size='large'
            checked={checkedItems.length === items.length}
            indeterminate={checkedItems.length > 0 && checkedItems.length < items.length}
            onChange={handleChange1}
            />
          </div>
        }
      />
      <div className='Rental-Namebox'>
          <span>상품명</span>
      </div> 

      <div className='Renatal-Price'>
          <p>대여가격</p>
      </div>

    
      <div className='RentDay'>
          <span>대여날짜</span>
      </div>  
    </div>
    
    <div className='Rental-ItemsContainer'>
      {items.map((item) => (
        <div className='Rental-ItemContainer'>
          <div className='Rental-CheckContainer'>
            {children(item.id)}
          </div>
          <div key={item.id} className='ImageBox'> 
            <img src='/images/cartbookimage.jpg' alt='cartbookimage'/> 
          </div>
          <div className='Rental-TextInner'>
            <span>{item.name}</span> 
            <span>{item.text}</span>  
          </div>

          <div className='Rental-PriceInner'>
            <span>{item.rentprice}</span>
          </div>

          <div className='Rental-RentDay'>
            {/* <span>{item.day}</span><br/> */}
            <span>135일</span>
          </div>

    
        </div>
      ))}
    </div> 
    </>
  )
}
export default RentalItems