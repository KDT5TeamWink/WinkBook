import BookCustom from '../../../bookcustom/bookcustom';
import { useEffect, useState } from 'react';
import './DetailPage.scss';
import { useParams } from 'react-router-dom';
import { getDetail } from '@/Apis/productApi';

function DetailPage() {
  const [detail, setDetail] = useState<Product>({} as Product);
  const { productNo } = useParams();
  async function getDetails() {
    try {
      const data = await getDetail(productNo as string);
      setDetail(data.product);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => {
      await getDetails();
    })();
  }, []);

  return (
    <>
      <div className="DetailContainer">
        <div className="ImgContainer">
          <BookCustom />
        </div>

        <div className="LeftContainer">
          <div className="TitleBox">
            <p>제목입니다. </p>
          </div>
          <div className="BookimgBox">
            <img src="/public/images/bookcover.jpg" alt="bookimgs" />
          </div>
        </div>

        <div className="RightContainer">
          <div className="RightContainer-TopText">
            <p>
              책모양 아크릴 거울 <br />
              (대상 도서 포함 3만원 이상 구매 시)
            </p>
          </div>

          <div className="RightContainer-Content">
            <div className="OriginPrice">
              <span className="PriceText">정가</span>
              <span className="PriceNumber">22,000</span>
            </div>
            <div className="OriginPrice">
              <span className="PriceText">판매가</span>
              <span className="PriceNumber">22,000</span>
            </div>
            <div className="OriginPrice">
              <span className="PriceText">수량</span>
              <span className="PriceNumber">22,000</span>
            </div>
            <div className="ContentContainer">
              <span className="ContentBox">줄거리</span>
              <span className="contentText">
                <p>
                  더 이상 설명이 필요 없는 20세기 환경학 최고의 고전 [침묵의
                  봄]이 50주년 기념 개정판으로 나왔다. 이번 개정판에는 서문과
                  후기가 완전히 새롭게 단장되었으며, 2002년 출간본에는
                  없던(원서에도 없었음) 찾아보기를 새롭게 추가했다. 그리고
                  편집과 장정도 완전히 바뀌었다.
                </p>
              </span>
            </div>
            <div className="CardPrice">
              <span className="CardText">카드</span>
              <span className="PriceNumber">무이자 할부</span>
              <span className="PriceNumber">소득공제300원</span>
            </div>

            <div className="ButtonContainer">
              <button className="CartAdd">장바구니 담기</button>
              <button className="BookBill">책 대여하기</button>
            </div>
          </div>
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: detail.description }}></div>
    </>
  );
}
export default DetailPage;
