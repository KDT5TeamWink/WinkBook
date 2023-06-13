import BookCustom from '../../../bookcustom/bookcustom';
import { useEffect, useState } from 'react';
import './DetailPage.scss'
import { useParams } from 'react-router-dom';
import { getDetail } from '@/Apis/productApi';

function DetailPage(){

  interface DetailInfo {
    detail_image:string,
    product_name:string,
    retail_price:number,
    simple_description:string,
    summary_description:string,
    product_no:string,
    price:number,
    price_excluding_tax: string,
    selling: string,
    description:string 
  }
  const [detail, setDetail] = useState<DetailInfo>({} as DetailInfo);
  const [book, setBook] = useState([]);



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


  const BuyBook = (detailnum) => {
    let Cart = localStorage.getItem('cart');

    // if(Cart === null) {
    //   Cart = [];
    // } else {
    //   Cart = JSON.parse(Cart);
    // }

    // let datalist = {
    //   "buy": []
    //   ,"rent": []
    // }1


    // datalist.buy[1]= productid;
    
    // buy - [1,2,4,56]
    // rent - [1,3,6,7]
    // let c = localStorage.getIte(cart);
    // c.buy 
    // Cart.push()
    // console.log(detail);
  }

    const disableLinkClick = (event) => {
      event.preventDefault();
      // You can add any additional handling here if needed
    };
  
    const modifiedDescription = detail.description
    ? detail.description.replace(/<a\b[^>]*>/gi, (match) =>
        match.replace('href', 'data-disabled-href')
      )
    : '';
  
  return(
    <>

    <div className="DetailContainer">
      <div className="ImgContainer">
        <BookCustom/>
      </div>

      <div className="LeftContainer">
        <div className="TitleBox">
          <span>{detail.product_name} </span>
        </div>
        <div className="BookimgBox">
          <img src={detail.detail_image}/>
        </div>
      </div>

      <div className="RightContainer">
        <div className="RightContainer-TopText">
          <p>책모양 아크릴 거울 <br/>(대상 도서 포함 3만원 이상 구매 시)</p>
        </div>

        <div className="RightContainer-Content">
          <div className="OriginPrice">
            <span className="PriceText">판매가</span>
            <span className="PriceNumber">{detail.price}</span>
          </div>
          <div className="ContentContainer">
            <span className="ContentBox">줄거리</span>
            <span className="contentText">
            <p></p>
            </span>
          </div>
          <div className="CardPrice">
            <span className="CardText">카드</span>
            <span className="PriceNumber">무이자 할부</span>
            <span className="PriceNumber">소득공제300원</span>
          </div>

          <div className="ButtonContainer">
            <button className="CartAdd" onClick={()=> BuyBook(detail.product_no)}> 책 구매하기</button>
            <button className="BookBill">책 대여하기</button>
            
          </div>
        </div>
      </div>
      <div className="InnerContent"dangerouslySetInnerHTML={{ __html: modifiedDescription}} 
      onClick={disableLinkClick}>
      </div>
    </div>
    {/* <div className="InnerContent"dangerouslySetInnerHTML={{ __html: modifiedDescription}} 
    onClick={disableLinkClick}>
      
      </div> */}
    {/* <div dangerouslySetInnerHTML={{ __html: detail.detail_image }}>
    </div> */}

    {/* <div>
      <img src={detail.detail_image}/>
    </div> */}

    </>
  );
}
export default DetailPage;