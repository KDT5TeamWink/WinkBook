import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyPage.scss";

function MyPage() {

  const TopCategory = {
    orderId:'주문번호',
    orderDate:'주문날짜',
    productname:'상품이름',
    price:'상품가격',
    cancel:'구매취소'
  } as const;

const [itemList, setItemList] = useState([]);
const [mydataList, setMydataList] = useState([]);

useEffect(() => {
  const paynumber = window.localStorage.getItem("mypayment");
  const merchantUids = JSON.parse(paynumber);

  axios({
    method: "post",
    url: "/iamport/users/getToken",
    data: JSON.stringify({
      imp_key: "5758023681388354",
      imp_secret: "tCdwGmiflqhMA3It54n6aLBIeA7LCg0O3WYu5qI1SKpwQ85FKXtJsiHu8yUWTynhDx7fxCFY1wsA3KVc",
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.data.response)
    .then((data) => {
      axios.get(`/iamport/payments/status/paid?limit=20&sorting=paid&_token=${data.access_token}`)
        .then((res) => res.data.response)
        .then((res) => {
          if (res && res.list) {
            const filteredList = res.list.filter((item) => merchantUids.includes(item.merchant_uid));
            setItemList(filteredList);
          } else {
            console.log('Invalid response format');
          }
        })
        .catch((error) => {
          console.log('Error occurred:', error);
        });
    });
}, []);

useEffect(() => {
    const useData = itemList.filter((item) => item.custom_data);
    useData.forEach((item) => {
      if(item.custom_data){ 
          let parsedData = JSON.parse(item.custom_data);
          parsedData = parsedData.map((data) => ({
            ...data,
            paid_at: item.paid_at, //결제날짜 
            merchant_uid: item.merchant_uid,//주문번호 
            // Add more properties as needed
          }));
          setMydataList((prevDataList) => [...prevDataList, ...parsedData]);
        }
    });
}, [itemList]);

useEffect(() => {
  console.log(mydataList);
},[mydataList]);

const getDate = function(param){
  const date = new Date(param * 1000);
  const koreaTime = date.toLocaleString("ko-KR", { 
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  return koreaTime;
}

  return (
    <>
      <div className="MyPage-AllLayout">
        <div className="myPageContainer">
          <div className="subContainer">
            <div className="profile">
              <div className="profilePhoto"></div>
              <div className="profileContainer">
                <div className="profileName">
                  <p>닉네임</p>
                </div>
                <div className="profileText">
                  <p>프로필 자기소개란입니다.</p>
                </div>
              </div>
            </div>
            <div className="category">
              <Link to="/">
                <div className="categoryTap">주문내역조회</div>
              </Link>{" "}
              <br />
              <Link to="/userinfo">
                <div className="categoryTap">회원정보 수정</div>
              </Link>{" "}
              <br />
            </div>
          </div>

          <div className="detailsContainer">
            <div className="orderText">구매 내역</div>


            <div className="orderContainer">

            <div className="TopCategory">
                {Object.keys(TopCategory).map(key => {
                  return <span className="TopCategory-inner" key={key}>
                    {TopCategory[key]}
                  </span>
                })}
            </div>
              <div className="orderBox">
                {mydataList
                .filter(el => el.gubun === 'buy') 
                .map((item, index) => (
                 
                  <div className="orderList" key={index}>
                    <span>{item.merchant_uid.replace("mid_","")}</span>
                      <span>{getDate(item.paid_at)}</span>
                          <div className="orderList-ImageBox">
                            <img src={item.small_image} alt="책이미지"/>
                            <span className="orderList-ImageBox__text">{item.product_name}</span>
                          </div>
                      <span className="orderList-priceBox">{item.price}</span> 
                      <div className="Buy-ButtonBox">
                        <button>x</button>
                      </div>
                  </div>
                
                ))}
              </div>
            </div>

            <div className="RentContainer-text">대여 내역</div>
              <div className="RentContainer">
                <div className="RentTop-Category">
                  {Object.keys(TopCategory).map(key => {
                    return <span className="RentCategory-inner" key={key}>
                      {TopCategory[key]}
                    </span>
                  })}
                </div>
                <div className="RentBox">
                {mydataList
                .filter(el => el.gubun === 'rent') 
                .map((item, index) => (
                 
                  <div className="RentList" key={index}>
                    <span>{item.merchant_uid.replace("mid_","")}</span>
                      <span>{getDate(item.paid_at)}</span>
                          <div className="RentList-ImageBox">
                            <img src={item.small_image} alt="책이미지"/>
                            <span className="RentList-ImageBox__text">{item.product_name}</span>
                          </div>
                      <span className="RentList-priceBox">{item.price}</span> 
                      <div className="Rent-ButtonBox">
                        <button>x</button>
                      </div>
                  </div>
                
                ))}
                </div>
              </div>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
