import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Category from './common/components/Category';
import { MypageToken } from '@/Apis/productApi';
import { TokenMe } from '@/Apis/register';
import './MyPage.scss';
import Swal from 'sweetalert2';

interface PaymentItem {
  merchant_uid: string;
  custom_data: string;
  paid_at: string;
}
interface PaymentsResponse {
  response: {
    list: PaymentItem[];
  };
}
interface CategoryMap {
  readonly [key: string]: string;
}

interface PaymentsUser {
  displayName: string;
  email: string;
}

interface PageData {
  gubun: string;
  merchant_uid: string;
  small_image: string;
  product_name: string;
  price: number;
  custom_data: string;
  paid_at: string;
}
function MyPage() {
  const TopCategory: CategoryMap = {
    orderId: '주문번호',
    orderDate: '주문날짜',
    productname: '상품이름',
    price: '상품가격',
    cancel: '구매취소',
  } as const;
  const [itemList, setItemList] = useState<PaymentItem[]>([]);
  const [mydataList, setMydataList] = useState<PageData[]>([]);
  const [user, setUser] = useState<PaymentsUser>({
    displayName: '',
    email: ''
  });

  const GetToken = async  () => {
    try{
    const accessToken = await MypageToken();
     return accessToken;
    } catch (error) {
      console.log(error);
      throw error;
    }       
  }

  const GetJson = (data:any) => {
    try{
        if(data){
          // 문자열 배열 형태로 들어감 
            const datalist = Object.assign(data);
          // 문자형. 이메일이 있는지 없는지  없는게 -1 , 없는게 아닐시 
          if(datalist.indexOf("email") != -1){
            // email이랑 user.email이 동일한지 체크 
            if(datalist.match(user.email)){
              return true;
            }
          }else{
            return false;
          }
        }else{
          return false;
        }
      }catch(e){
        console.log(e);
        return false;
      }
  }

  const fetchData = async (): Promise<void> => {
    setMydataList([]);
    try {
      const paynumber = true;
      if (paynumber) {
        const accessToken = await GetToken();
        const paymentsResponse: AxiosResponse<PaymentsResponse> =
          await axios.get(
            `/iamport/payments/status/paid?limit=100&sorting=paid&_token=${accessToken}`
          );
        if (
          paymentsResponse.data &&
          paymentsResponse.data.response &&
          paymentsResponse.data.response.list 
        ) {

          const filteredList: PaymentItem[] =
          paymentsResponse.data.response.list.filter((item) =>
          // 여기가 true일때 작동함.
            GetJson(item.custom_data)
          );
          if (filteredList) {
            setItemList(filteredList);
          } else {
            setItemList([]);
          }
        } else {
          console.log('Invalid response format');
          setItemList([]);
        }
      }
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const Payauthenticate = async () => {
      try {
        const userData = await TokenMe();
        setUser((prevUser) => ({
          ...prevUser,
          displayName: userData.displayName,
          email: userData.email,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    Payauthenticate();
  }, []);


  useEffect(() => {
    setMydataList([]);
    if (itemList.length === 0) {
      return;
    }

  const checkJson = function (str: string){
    try{
      JSON.parse(str);
    }catch(e){
      return false;
    }
    return true;
  }
  const useData = itemList.filter((item) => 
    GetJson(item.custom_data)
  );
  setMydataList([]);
  useData.forEach((item) => {
  if (checkJson(item.custom_data)) {
    try {
      let parsedData: PageData[] = JSON.parse(item.custom_data);
      parsedData = parsedData.map((data) => ({
        ...data,
        paid_at: item.paid_at,
        merchant_uid: item.merchant_uid,
      }));

      setMydataList((prevDataList) => [...prevDataList, ...parsedData]);
    } catch (error) {
      console.error("Error parsing custom_data:", error);
    }
  }
  });
  }, [itemList]);

  const onClickDelete = (key: string) => {
    Swal.fire({
      title: '정말 환불하시겠습니까?',
      text: '돌이킬 수 없습니다:(',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#df307f',
      cancelButtonColor: '#e24457',
      confirmButtonText: '네',
      cancelButtonText: '아니오',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const accessToken = await GetToken();
        const data = {
          merchant_uid: key,
        };
        await axios
          .post(`/iamport/payments/cancel?_token=${accessToken}`, data)
          .then((res) => {
            if (res.status == 200) {
              Swal.fire('주문이 취소되었습니다!', '', 'success');
              // 취소한후 다시 데이터 불러옴.
              fetchData();//DeleteList(key);
            } else {
              console.log(res.status);
            }
          });
      }
    });
  };


  const getDate = function (param: any) {
    const date = new Date(param * 1000);
    const koreaTime = date.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return koreaTime;
  };

  const formatter = new Intl.NumberFormat("ko-KR");

  return (
    <>
      <div className="MyPage-AllLayout">
        <div className="MyPage-AllLayout__center">
          <div className="LeftContainer">
            <Category />
          </div>
        
          <div className="RightContainer">
            <div className="orderText">구매 내역</div>
            <div className="orderContainer">
              <div className="TopCategory">
                {Object.keys(TopCategory).map((key) => {
                  return (
                    <span className="TopCategory-inner" key={key}>
                      {TopCategory[key]}
                    </span>
                  );
                })}
              </div>
              <div className="orderBox">
                {mydataList
                  .filter((el: PageData) => el.gubun === 'buy')
                  .map((item: PageData, index: number) => (
                    <div className="orderList" key={index}>
                      <span>{item.merchant_uid.replace('mid_', '')}</span>
                      <span>{getDate(item.paid_at)}</span>
                      <div className="orderList-ImageBox">
                        <img src={item.small_image} alt="책이미지" />
                        <span className="orderList-ImageBox__text">
                          {item.product_name}
                        </span>
                      </div>
                      <span className="orderList-priceBox">
                        {formatter.format(item.price)}원
                      </span>
                      <div className="Buy-ButtonBox">
                        <button
                          onClick={() => onClickDelete(item.merchant_uid)}>
                          x
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="RentContainer-text">대여내역</div>
            <div className="RentContainer">
              <div className="RentTop-Category">
                {Object.keys(TopCategory).map((key) => {
                  return (
                    <span className="RentCategory-inner" key={key}>
                      {TopCategory[key]}
                    </span>
                  );
                })}
              </div>
              <div className="RentBox">
                {mydataList
                  .filter((el: PageData) => el.gubun === 'rent')
                  .map((item: PageData, index: number) => (
                    <div className="RentList" key={index}>
                      <span>{item.merchant_uid.replace('mid_', '')}</span>
                      <span>{getDate(item.paid_at)}</span>
                      <div className="RentList-ImageBox">
                        <img src={item.small_image} alt="책이미지" />
                        <span className="RentList-ImageBox__text">
                          {item.product_name}
                        </span>
                      </div>
                      <span className="RentList-priceBox">{formatter.format(item.price)}원</span>
                      <div className="Rent-ButtonBox">
                        <button
                          onClick={() => onClickDelete(item.merchant_uid)}
                        >
                          x
                        </button>
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
