import BookCustom from "../../../bookcustom/bookcustom";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopHeader from "./components/TopHeader";
import { getDetail } from "@/Apis/productApi";
import "./DetailPage.scss";

function DetailPage() {
  interface DetailInfo {
    detail_image: string;
    product_name: string;
    retail_price: number;
    simple_description: string;
    summary_description: string;
    product_no: string;
    price: number;
    price_excluding_tax: string;
    selling: string;
    description: string;
  }

  const navigate = useNavigate();
  const [detail, setDetail] = useState<DetailInfo>({} as DetailInfo);

  const { productNo } = useParams();
  async function getDetails() {
    try {
      const data = await getDetail(productNo as string);
      setDetail(data.product);
    } catch (err) {
      console.log(err);
    }
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const [ScrollY, setScrollY] = useState(0);

  function handleScroll() {
    if (ScrollY > 800) {
      setScrollY(window.pageYOffset);
      setIsScrolled(true);
    } else {
      setScrollY(window.pageYOffset);
      setIsScrolled(false);
    }
  }

  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await getDetails();
    })();
  }, []);

  const BuyBook = (detail: any) => {
    let Cart = localStorage.getItem("cart");
    if (Cart === null) {
      Cart = [];
    } else {
      Cart = JSON.parse(Cart);
    }

    const datalist = {
      buy: [],
      rent: [],
    };

    // if (Cart.some((item) => item.id === detail.id)) {
    //   alert('이미 장바구니에 담으셨습니다.');
    // } else {
    Cart.push(detail);
    Cart = new Set(Cart);
    Cart = [...Cart];
    localStorage.setItem("cart", JSON.stringify(Cart));
    datalist.buy = Cart;
    console.log(datalist);
    alert("장바구니에 담겼습니다.");
    navigate("/cart");
    // }
  };

  const disableLinkClick = (event) => {
    event.preventDefault();
    // You can add any additional handling here if needed
  };

  const modifiedDescription = detail.description
    ? detail.description.replace(/<a\b[^>]*>/gi, (match) =>
        match.replace("href", "data-disabled-href")
      )
    : "";

  const renderCardPriceItems = () => {
    const cardPriceItems = {
      "카드/간편결제할인": "",
      "무이자 할부": "",
      소득공제300원: "",
    };

    return Object.entries(cardPriceItems).map(([key]) => (
      <span key={key}>{`${key}`}</span>
    ));
  };

  return (
    <>
      <div className="DetailContainer">
        <div className="ImgContainer">
          <BookCustom />
        </div>

        <div className="LeftContainer">
          <div className="TitleBox">
            <span>{detail.product_name}</span>
            <span>-단돈 1,000원으로 시작할수 있는</span>
            <div className="InnerTitleBox">
              <p>윙크북 {detail.product_name} 전자책 출간일 2023-0505</p>
            </div>
          </div>

          <div className="BookimgBox">
            <img src={detail.detail_image} />
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
              <span className="PriceText">판매가</span>
              <span className="PriceNumber">{detail.price}</span>
            </div>
            <div className="ContentContainer">
              <span className="ContentBox">줄거리</span>
              <span className="contentText">
                <p>{detail.summary_description}</p>
              </span>
            </div>
            <div className="CardPrice">{renderCardPriceItems()}</div>

            <div className="ButtonContainer">
              <button className="CartAdd" onClick={() => BuyBook(detail)}>
                {" "}
                책 구매하기
              </button>
              <button className="BookBill">책 대여하기</button>
            </div>
          </div>
        </div>

        <div className="BookContent"></div>
        <span className="BookContent-text">
          출판사 제공 <br />
          책소개
        </span>
        <div className={`TopBox ${isScrolled ? "slide-down" : ""}`}>
          {isScrolled ? (
            <TopHeader
              productName={detail.product_name}
              productPrice={detail.price}
            />
          ) : (
            ""
          )}
        </div>

        <div
          className="InnerContent"
          dangerouslySetInnerHTML={{ __html: modifiedDescription }}
          onClick={disableLinkClick}
        ></div>

        {/* <div className='Bookple-Container'>
        <span className='Bookple-Container__text'>북플 BOOKPLE</span>
        <ul className='Bookple-Container__coment'>
          <li>이책의 마니아가 남긴글</li>
          <li>친구가 남긴글</li>
          <li>내가 남긴글</li>
        </ul>
      </div> */}
      </div>
    </>
  );
}
export default DetailPage;
