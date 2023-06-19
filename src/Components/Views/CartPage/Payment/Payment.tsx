import { useEffect } from "react";

export interface PaymentInfo {
  amount: number;
}

const Payment = ({ amount }: PaymentInfo) => {
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
    const { IMP }: any = window;
    IMP.init("imp36252452");
    const data = {
      pg: "html5_inicis", // PG사 html5_inicis: KG이니시스, kakaopay: 카카오페이, naverpay: 네이버페이, payco: 페이코
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: amount, // 결제금액
      name: "아임포트 결제 데이터 분석", // 주문명
      buyer_name: "김세연", // 구매자 이름
      // buyer_tel: "01032752740", // 구매자 전화번호
      // 전화번호: 일단 빼고 나중에 추가 시도..
      buyer_email: "", // 구매자 이메일 - 작성시 구매창에서 이메일 부분에 들어가있음
    };
    IMP.request_pay(data, callback);
  };

  function callback(response: any) {
    const { success, error_msg } = response;

    if (success) {
      alert("결제 성공");
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
