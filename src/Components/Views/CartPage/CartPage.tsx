import "./CartPage.scss";
import { useState, useEffect } from "react";
import CartItems from "./CartItems/CartItems";
import RentalItems from "./CartRent/CartRent";
import Payment from "./Payment/Payment";

interface BuyItem {
  id: number;
  product_name: string;
  price: number;
  detail_image: string;
  product_no: number;
}

function CartPage() {
  const [CartItemsValue, setCartItemsValue] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [selectedItemRent, setSelectedItemRent] = useState<string[]>([]);
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [buyItem, setbuyItem] = useState<BuyItem[]>([]);

  useEffect(() => {
    const BuyItems = JSON.parse(localStorage.getItem("cart")) || [];
    setbuyItem(BuyItems);
  }, []);
  
  useEffect(() => {
    calculateTotal();
  }, [selectedItem]);

  const checkOne = (event: React.ChangeEvent<HTMLInputElement>, buyItem: any[], gubun: string) => {
    const checkedValue = event.target.checked;
      // Filter buyItem based on the condition (item.gubun === gubun)
    const filteredItems = buyItem.filter((item) => item.gubun === gubun);
      // Update selected items based on checkedValue
    const updatedSelectedItems = checkedValue ? [...filteredItems] : [];
      // Update selectedItem state
    if(gubun === "rent"){
      setSelectedItemRent(updatedSelectedItems);
    }else{
      setSelectedItem(updatedSelectedItems);
    }
      // Return an array of indices for the updated selected items
    const updatedCheckedItems = updatedSelectedItems.map((item, index) => index);
    return updatedCheckedItems;
  };
  

  const checkTwo = (event: React.ChangeEvent<HTMLInputElement>, checkedItems:any, el:any) => {
    const itemId = parseInt(event.target.name);
      let updatedCheckedItems: number[] = [];
      let updatedItems: any[] = [];
      if (event.target.checked) {
        updatedCheckedItems = [...checkedItems, itemId];
        updatedItems = [...selectedItem, el];
      } else {
        updatedCheckedItems = checkedItems.filter((id) => id !== itemId);
        updatedItems = selectedItem.filter((key) => key.product_no !== el.product_no);
      }
      setSelectedItem(updatedItems);
      return updatedCheckedItems;
  };

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

  
  const RemoveBuyItem = (index: number, key: any, buyItem:any) => {
    console.log(key);
    const confirmation = window.confirm("삭제하시겠습니까?");
    if (confirmation) {
      const updatedCartData = JSON.parse(localStorage.getItem("cart"));
      localStorage.setItem(
        "cart",
        JSON.stringify(
          updatedCartData.filter((item) => item.product_no !== key)
        )
      );

      console.log(updatedCartData);
      const updatedBuyItem = [...updatedCartData];
      //선택한 index 1개를 buyItem 배열에서 제거.
      updatedBuyItem.splice(index, 1);
      // 제거한후의 값 setState 갑에 담아줌.
      setbuyItem(updatedBuyItem);
      // cart 키 값으로 로컬에서 데이터 찾아옴
      console.log(buyItem);
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
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
            delete={RemoveBuyItem}
            datalist={buyItem}
            setdata={setbuyItem}
            checkOne={checkOne}
            checkTwo={checkTwo}
          />
        </div>
        <span className="RentText">대여 </span>
        <div className="RentContainer">
          <RentalItems
            check={CartItemsValue}
            pitem={selectedItemRent}
            setItems={setSelectedItemRent}
            delete={RemoveBuyItem}
            datalist={buyItem}
            setdata={setbuyItem}
            checkOne={checkOne}
            checkTwo={checkTwo}
          
          />
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
              <Payment amount={Total} productlists={selectedItem} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
