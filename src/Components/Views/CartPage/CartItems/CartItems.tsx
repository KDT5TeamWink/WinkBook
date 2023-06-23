import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
//import RemoveItemButton from "../Components/DeletButton";
import "./CartItems.scss";

interface BuyItem {
  id: number;
  product_name: string;
  price: number;
  detail_image: string;
  product_no: number;
}

interface CartItem {
  product_no: number;
  // Add other properties here
}

interface CartItemsProps {
  check: number[];
  pitem: string;
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  delete: (index: number, key: any) => void;
  datalist: any;
  setdata: React.Dispatch<React.SetStateAction<BuyItem[]>>;
  checkOne: any;
  checkTwo: any;
}

const CartItems = ({
  check,
  pitem,
  setItems,
  delete: RemoveBuyItem,
  datalist,
  setdata,
  checkOne,
  checkTwo,
}: CartItemsProps) => {
  const [buyItem, setbuyItem] = useState<BuyItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>(check);

  useEffect(() => {
    setbuyItem(datalist);
  }, [datalist]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems(checkOne(event, buyItem, "buy"));
  };

  const handleChange2 =
    (el: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems(checkTwo(event, checkedItems, el));
    };

  const children = (el: any, index: number) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: 3,
        fontSize: "large",
      }}
    >
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
                  checkedItems.length > 0 &&
                  checkedItems.length < buyItem.length
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
          <span>삭제</span>
        </div>
      </div>

      <div className="ItemsContainer">
        {buyItem
          .filter((el) => el.gubun === "buy")
          .map((el, index) => (
            <div className="ItemContainer" key={index}>
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
                <button
                  onClick={() => RemoveBuyItem(index, el.product_no, buyItem)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default CartItems;
