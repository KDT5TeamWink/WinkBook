import React from "react"
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import './CartRent.scss'

interface RentItem {
  id: number;
  product_name: string;
  price: number;
  detail_image: string;
  product_no: number;
  gubun: string;
  name: string;
  rentdate: string;

}

interface CartItem {
  product_no: number;
}
  
  interface CartItemsProps {
    check: number[];
    pitem: string;
    setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    delete: (index: number, key: any) => void;
    datalist : any
    setdata : React.Dispatch<React.SetStateAction<RentItem[]>>;
    checkOne : any;
    checkTwo : any;
  }
  
  const RentalItems = ({ check,delete: RemoveBuyItem, datalist, checkOne, checkTwo  }: CartItemsProps) => {
    
     const [buyItem, setbuyItem] = useState<RentItem[]>([]);
     const [checkedItems, setCheckedItems] = useState<number[]>(check);

     useEffect(() => {
      setbuyItem(datalist)
    }, [datalist]);


    // useEffect(() => {
    //   BuyCart();
    // }, []);

    // const BuyCart = () => {
    //   const BuyItems = JSON.parse(localStorage.getItem("cart")) || [];
    //   setbuyItem(BuyItems);
    //   console.log(BuyItems)
    // }
  

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems(checkOne(event, buyItem,'rent'));
    };

    const handleChange2 =
    (el: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems(checkTwo(event, checkedItems,el))
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
            <div className="LableBox">
            <Checkbox
              checked={checkedItems.includes(index)}
              onChange={handleChange2(el)}
              name={index}
            />
            </div>
          }
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
            checked={checkedItems.length === buyItem.length}
            indeterminate={checkedItems.length > 0 && checkedItems.length < buyItem.length}
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

      <div className="DeleteDay">
        <span>삭제</span>
      </div>
    </div>
    
    <div className='Rental-ItemsContainer'>
      {buyItem
        .filter(el => el.gubun === 'rent') 
        .map((el,index) => (
        <div className='Rental-ItemContainer' >
          <div className='Rental-CheckContainer' key={index}>
            {children(el, index)}
          </div>
          <div key={el.id} className='ImageBox'> 
            <img src={el.detail_image} alt='cartbookimage'/> 
          </div>
          <div className='Rental-TextInner'>
            <span>{el.name}</span> 
          </div>

          <div className='Rental-PriceInner'>
            <span>{Number(el.price).toFixed(0)}원</span>
          </div>
          <div className='Rental-RentDay'>
            <span>{el.rentdate}일</span>
          </div>
          <div className="RentButtonBox">
            <button onClick={() => RemoveBuyItem(index, el.product_no)}>
              삭제
            </button>
          </div>    
        </div>
      ))}
    </div>
    </>
  )
}
export default RentalItems