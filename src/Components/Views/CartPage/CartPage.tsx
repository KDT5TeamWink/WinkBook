import "./CartPage.scss";
import { useState, useEffect } from "react";
import CartItems from "./CartItems/CartItems";
import RentalItems from "./CartRent/CartRent";
import Payment from "./Payment/Payment";

function CartPage() {
  // const [rentalbook, setRentalBook] = useState<Item[]>([
  //   { id: 1,  name: '[국내도서]시작하세요! C# 10프로그래밍', text:"*밤 11시 잠들기전 배송",
  //   price:"정가: 36000", sale:"판매가:32,400", malize:"마일리지: 1,800원"},
  // ])

  // const BuyProducts = () => {
  //   alert("주문완료!")
  // }

  const [CartItemsValue, setCartItemsValue] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);

  const [RentalItemsValue, setRentalItemsValue] = useState<number[]>([]);

  useEffect(() => {
    console.log(CartItemsValue + "k");
    console.log(selectedItem);
  }, [CartItemsValue]);

  useEffect(() => {
    calculateTotal();
  }, [selectedItem]);

  const calculateTotal = () => {
    console.log("ccccccc" + Array.isArray(selectedItem));
    let total = 0;
    if (Array.isArray(selectedItem)) {
      selectedItem.forEach((item) => {
        console.log(item);
        const itemPrice = parseFloat(item.price);
        console.log(itemPrice);
        if (!isNaN(itemPrice)) {
          console.log(itemPrice);
          total += itemPrice;
        }
      });
    }
    setTotal(total);
    console.log(total + "토");
    setShowTotal(true);
  };

  return (
    <>
      <div className="CartPage-AllLayout">
        <span className="ProductText">구매</span>
        <div className="CartContainer">
          <CartItems
            check={CartItemsValue}
            pitem={selectedItem}
            setItems={setSelectedItem}
          />
        </div>
        {/* 여기에서는 대여 부분  */}
        <span className="RentText">대여 </span>
        <div className="RentContainer">
          <RentalItems />
        </div>

        <span className="BuyText">결제</span>
        <div className="BuyContainer">
          <div className="NowBuy">
            <div className="Buy-Container">
              <div className="Pay-Container">
                <span>총 상품 가격 </span>
                {ShowTotal && <h2>Total Amount: ${Total}</h2>}
              </div>
            </div>

            <div className="AllCount-Container">
              <div className="AllCount-Container__box">
                <span>총 결제 예상 금액</span>
                <span>28,000 원</span>
              </div>
            </div>

            <div className="Buy-ButtonBox">
              {/* <button onClick={BuyProducts}>선택한 상품 주문하기</button> */}
              <Payment amount={Total} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
