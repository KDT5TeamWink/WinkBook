import "./CartPage.scss";
import { useState, useEffect } from "react";
import CartItems from "./CartItems/CartItems";
import RentalItems from "./CartRent/CartRent";
import Payment from "./Payment/Payment";

function CartPage() {
  

  const [CartItemsValue, setCartItemsValue] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);

  const [RentalItemsValue, setRentalItemsValue] = useState<number[]>([]);


  useEffect(() => {
    calculateTotal();
  }, [selectedItem,CartItemsValue]);

  const calculateTotal = () => {
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
          <RentalItems 
            check={CartItemsValue}
            pitem={selectedItem}
            setItems={setSelectedItem}
          />
        </div>

        <span className="BuyText">결제</span>
        <div className="BuyContainer">
          <div className="NowBuy">
            <div className="Buy-Container">
              <div className="Pay-Container">
                <span>총 상품 가격 </span>
                {ShowTotal && <h2> ${Total}</h2>}
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
              <Payment amount={Total} productlists={selectedItem} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
