import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Category from './common/components/Category';
//import { GetImpToken } from "@/Apis/productApi";
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
interface PageData {
  gubun: string;
  merchant_uid: string;
  small_image: string;
  product_name: string;
  price: string;
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

  const GetToken = async  () => {
    try{
    const response = await axios.post('/iamport/users/getToken',
      {
        imp_key: '5758023681388354',
        imp_secret: 'tCdwGmiflqhMA3It54n6aLBIeA7LCg0O3WYu5qI1SKpwQ85FKXtJsiHu8yUWTynhDx7fxCFY1wsA3KVc',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const accessToken = response.data.response.access_token;
    return accessToken;
    } catch (error) {
      console.log(error);
      throw error;
    }    
  }

  const fetchData = async (): Promise<void> => {
    try {
      const paynumber: string | null = window.localStorage.getItem('mypayment');
      if (paynumber) {
        const merchantUids = JSON.parse(paynumber);
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
              merchantUids.includes(item.merchant_uid)
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
  const useData = itemList.filter((item) => item.custom_data);
    useData.forEach((item) => {
  if (checkJson(item.custom_data)) {
    try {
      let parsedData: PageData[] = JSON.parse(item.custom_data);
      console.log(JSON.parse(item.custom_data)+"dddddd")
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

  const DeleteList = (itemnum: string) => {
    const MyPay = localStorage.getItem('mypayment');
    if (MyPay && MyPay.includes(itemnum)) {
      const updatedList = MyPay.replace(itemnum, '').trim();
      localStorage.setItem('mypayment', updatedList);
    }
    fetchData();
  };
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
              DeleteList(key);
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
                        {item.price.slice(0, -3)}원
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
                      <span className="RentList-priceBox">{item.price.slice(0, -3)}원</span>
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
