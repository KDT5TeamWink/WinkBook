import React from "react"
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
//import YearBox from "Common/section/number";
// import './CartItems.scss'
import './CartRent.scss'



  interface RentItem {
    id: number;
    product_name: string;
    price: number;
    detail_image: string;
    product_no: number;
  }
  
  interface CartItemsProps {
    check: number[];
    pitem: string;
    setItems:string;
  
  }
  
  const RentalItems = ({ check, pitem, setItems }: CartItemsProps) => {
    
    const [buyItem, setbuyItem] = useState<RentItem[]>([]);
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
        console.log(itemId)
        updatedCheckedItems = [...checkedItems, itemId];
        updatedItems = [...pitem , el];
      } else {
        updatedCheckedItems = checkedItems.filter((id) => id !== itemId);
        updatedItems = pitem.filter((key) => key.product_no !== el.product_no);
      } 
      console.log(updatedCheckedItems)
      setItems(updatedItems);
      setCheckedItems(updatedCheckedItems);
      //setCheck(updatedCheckedItems);
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
            <span>{el.rentdate}</span>
          </div>

    
        </div>
      ))}
    </div>
    </>
  )
}
export default RentalItems