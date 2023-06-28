import { useState, useEffect } from "react";
import "./SearchPage.scss";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
const { VITE_CLIENT_ID } = import.meta.env;
import { getDetail } from "@/Apis/productApi";

const ajax = axios.create({
  baseURL: "/cafe24",
  headers: {
    "Content-Type": "application/json",
    "X-Cafe24-Api-Version": "2023-03-01",
    "X-Cafe24-Client-Id": VITE_CLIENT_ID,
  },
});

export default function SearchPage() {
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

  const [search, setSearch] = useState<Products>([] as Products);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  async function SearchAPI(product_name: string) {
    try {
      const res = await ajax.get("/products", {
        params: {
          product_name: product_name,
          offset: offset * 10,
        },
      });
      return res.data.products;
    } catch (err) {
      console.log(err);
    }
  }

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

  const BuyBook = (detail: any, type: string) => {
    let Cart = localStorage.getItem("cart");

    if (Cart === null) {
      Cart = [];
    } else {
      Cart = JSON.parse(Cart);
    }

    if (Cart.some((item) => item.product_no === detail.product_no)) {
      alert("이미 장바구니에 담으셨습니다.");
      return false;
    }

    if (type === "rent") {
      detail.rentdate = 7;
    }
    detail.gubun = type;
    Cart.push(detail);
    Cart = new Set(Cart);
    Cart = [...Cart];
    localStorage.setItem("cart", JSON.stringify(Cart));
    alert("장바구니에 담겼습니다.");
    navigate("/cart");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await getDetails();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await ajax
        .get("/products/count", {
          params: {
            product_name: params.keyword,
          },
        })
        .then((res) => setCount(res.data.count));
      const result = await SearchAPI(params.keyword);
      setSearch(result);
      console.log(result);
      window.scrollTo(0, 0);
    })();
  }, [params, offset]);

  return (
    <div className="Search-wrapper">
      {search &&
        search.map((v) => {
          return (
            <>
              <div className="SearchPage">
                <Link to={`/detail/${v.product_no}`}>
                  <div className="SearchPage__Images">
                    <img src={v.list_image} alt="책표지" />
                  </div>
                </Link>

                <div className="SearchPage__Items">
                  <Link to={`/detail/${v.product_no}`}>
                    <h1>{v.product_name}</h1>
                  </Link>

                  <div className="SearchPage__Item">
                    <p>{v.summary_description}</p>
                    <p>{v.product_tag}</p>
                  </div>
                  <div className="SearchPage__Price">
                    <p> {v.price.slice(0, -3)}원</p>
                    <p> {v.retail_price.slice(0, -3)}원</p>
                  </div>
                </div>
                <div className="SearchPage__ButtonBox">
                  <button onClick={() => BuyBook(detail, "buy")}>
                    구매하기
                  </button>
                  <button onClick={() => BuyBook(detail, "rent")}>
                    대여하기
                  </button>
                </div>
              </div>
            </>
          );
        })}
      <div className="pagination">
        <ul
          onClick={(e) => {
            if (e.target instanceof HTMLLIElement) {
              setOffset(e.target.value);
              // console.log("e:", e.target.value);
            }
          }}
        >
          {Array(parseInt(((count - 0.1) / 10 + 1).toString()))
            .fill(0)
            .map((i, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setOffset(index);
                  }}
                  id="click"
                >
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
