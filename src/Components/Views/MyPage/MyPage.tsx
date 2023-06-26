import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyPage.scss";
import Category from "./Common/components/Category";

interface User {
  displayName: string // 사용자 표시 이름
  profileImg: string // 사용자 프로필 이미지 URL
}


function MyPage() {

  const TopCategory = {
    orderId:'주문번호',
    orderDate:'주문날짜',
    productname:'상품이름',
    price:'상품가격',
    cancel:'구매취소'
  } as const;

  const defaultProfileImgUrl = "/public/images/default-profile.jpg";

  const [user, setUser] = useState<User>({ displayName: "", profileImg: defaultProfileImgUrl });

  // const [user, setUser] =useState<User>({} as User)
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

useEffect(() => {
  const authenticate = async () => {
    try {
      const response = await axios.post(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            apikey: "KDT5_nREmPe9B",
            username: "KDT5_TeamWink",
          },
        }
      );
      const userData = response.data;

      // 사용자 정보를 업데이트하기 전에 profileImg가 존재하지 않을 경우에만 기본 프로필 이미지 URL을 사용
      setUser((prevUser) => ({
        ...prevUser,
        displayName: userData.displayName,
        profileImg: userData.profileImg || defaultProfileImgUrl,
      }));
    } catch (error) {
      console.error(error);
      // 오류 처리
    }
  };

  authenticate();
}, []);

  return (
    <>
      <div className="MyPage-AllLayout">
        <div className="myPage-AllLayout__center">
          <div className="LeftContainer">
            <Category/>
            {/* <div className="profile">
            <img 
              className="profilePhoto"
              src={user.profileImg} 
              alt="프로필사진" 
              // style={{display:"inline-block"}}
            />
              <div className="profileContainer">
                <div className="profileName">
                  <p>{user.displayName}</p>
                </div>
              </div>
            </div>
            <div className="category">
              <Link to="/mypage">
                <div className="categoryTap">주문내역조회</div>
              </Link>{" "}
              <br />
              <Link to="/mypage/userinfo">
                <div className="categoryTap">회원정보 수정</div>
              </Link>{" "}
              <br />
            </div> */}
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
