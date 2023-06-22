import { useEffect } from "react";

export interface PaymentInfo {
  amount: number;
  productlists: any;
}

const Payment = ({ amount, productlists }: PaymentInfo) => {
  const orderNumber = `mid_${new Date().getTime()}`;
  console.log(orderNumber);

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  const onClickPayment = () => {
    console.log(productlists);

    const itemName = productlists.map((obj) => obj.product_name).join(",");

    const custom_data = [{productlists}];
    // custom_data = { 
    //                 0: [product_no:1,gubun:'buy'];
    //                 1: [product_no:3,gubun:'buy'];
    //                 2: [product_no:4,gubun:'rent'];
    //               }


    console.log(itemName);
    const { IMP }: any = window;
    IMP.init("imp36252452");

    const data = {
      pg: "html5_inicis", // PG사 html5_inicis: KG이니시스, kakaopay: 카카오페이, naverpay: 네이버페이, payco: 페이코
      pay_method: "card", // 결제수단
      merchant_uid: orderNumber, // 주문번호 // 만약 여기에 에세스키
      amount: amount, // 결제금액
      name: `${itemName}`, // 주문명
      buyer_name: "", // 구매자 이름
      // buyer_tel: "01032752740", // 구매자 전화번호
      // 전화번호: 일단 빼고 나중에 추가 시도..
      buyer_email: "", // 구매자 이메일 - 작성시 구매창에서 이메일 부분에 들어가있음
      //https://developers.portone.io/docs/ko/api/api-1/api-1
      //productinfos : productlists
      custom_data:productlists
    };

    IMP.request_pay(data, callback);
  };

  function callback(response: any) {
    const { success, error_msg } = response;

    if (success) {
      alert("결제 성공");
      //mypayment []
      //mypayment: [orderNumber1]
      let mypayarray = window.localStorage.getItem("mypayment");
      let combinedArray = JSON.parse(mypayarray);
      if (!combinedArray) {
        //mypayment: [orderNumber1]
        window.localStorage.setItem("mypayment", JSON.stringify([orderNumber]));
      } else {
        ////mypayment: [orderNumber1,orderNumber2] 배열을 다시 추가.
        combinedArray.push(orderNumber);
        window.localStorage.setItem("mypayment", JSON.stringify(combinedArray));
      }

      

      //결제 성공을 하고 성공된 데이터가 로컬스토리지에서 지워져야함. produc_id
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }
  return (
    <>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
};

export default Payment;
