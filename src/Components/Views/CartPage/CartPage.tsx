import "./CartPage.scss";
import { FormEvent, useState } from "react";
import CartItems from "./CartItems/CartItems";
import { Value } from "sass";
import RentalItems from "./CartRent/CartRent";
import Payment from "./Payment/Payment";

function CartPage() {
  // const [rentalbook, setRentalBook] = useState<Item[]>([
  //   { id: 1,  name: '[국내도서]시작하세요! C# 10프로그래밍', text:"*밤 11시 잠들기전 배송",
  //   price:"정가: 36000", sale:"판매가:32,400", malize:"마일리지: 1,800원"},
  // ])

  const Text = {
    "1": "상품명",
    "2": "가격",
    "3": "수량",
    "4": "대여날자",
  } as const;

  // const BuyProducts = () => {
  //   alert("주문완료!");
  // };

  return (
    <>
      <div className="CartPage-AllLayout">
        {/* <div className="CartPageTable">    */}

        <span className="ProductText">구매</span>
        <div className="CartContainer">
          <CartItems />
        </div>

        {/* </div> */}

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
                <span>28,000</span>
              </div>

              <div className="Pay-Container">
                <span>총 주문 상품수</span>
                <span>1종 1권(개)</span>
              </div>
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
            <Payment />
          </div>
        </div>
      </div>
    </>
  );
}
export default CartPage;
