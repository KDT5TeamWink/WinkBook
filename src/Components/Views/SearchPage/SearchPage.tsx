import { useState, useEffect } from "react";
import "./SearchPage.scss";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
const { VITE_CLIENT_ID } = import.meta.env;
import Swal from "sweetalert2";

const ajax = axios.create({
  baseURL: "/cafe24",
  headers: {
    "Content-Type": "application/json",
    "X-Cafe24-Api-Version": "2023-03-01",
    "X-Cafe24-Client-Id": VITE_CLIENT_ID,
  },
});

interface Product {
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
  rentdate: number;
  gubun: string;
}

interface SearchItem {
  rentdate?: number;
  gubun: string;
  product_no: string;
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<Product[] | undefined>();
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const params = useParams<{ keyword?: string }>();

  async function SearchAPI(product_name: string) {
    try {
      const res = await ajax.get("/products", {
        params: {
          product_name,
          offset: offset * 10,
        },
      });
      return res.data.products as Product[];
    } catch (err) {
      console.log(err);
      return [] as Product[];
    }
  }

  useEffect(() => {
    (async () => {
      if (params.keyword) {
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
      }
    })();
  }, [params, offset]);

  const BuyBook = (search: SearchItem, type: string) => {
    console.log(search);
    const cart: SearchItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.some((item) => item.product_no === search.product_no)) {
      Swal.fire("이미 장바구니에 담으셨습니다.", "", "warning");
      return false;
    }

    const searchItem: SearchItem =
      type === "rent"
        ? { ...search, rentdate: 7, gubun: type }
        : { ...search, gubun: type };
    cart.push(searchItem);

    const updatedCart = Array.from(new Set(cart));
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("장바구니에 담겼습니다.");
    navigate("/cart");
  };

  return (
    <>
      {search?.length === 0 ? (
        <div className="no_content">
          <p>검색결과가 존재하지 않습니다! 😊</p>
        </div>
      ) : (
        <div className="Search-wrapper">
          <div className="count">
            😶‍🌫️ "{params.keyword}"에 대한 검색결과가 총 {count}개 있습니다.
          </div>
          <hr />
          {search &&
            search.map((item: any) => {
              return (
                <>
                  <div className="SearchPage">
                    <Link to={`/detail/${item.product_no}`}>
                      <div className="SearchPage__Images">
                        <img src={item.list_image} alt="책표지" />
                      </div>
                    </Link>

                    <div className="SearchPage__Items">
                      <Link to={`/detail/${item.product_no}`}>
                        <h1>{item.product_name}</h1>
                      </Link>

                      <div className="SearchPage__Item">
                        <p>{item.summary_description}</p>
                        <p>{item.product_tag}</p>
                      </div>
                      <div className="SearchPage__Price">
                        <p> {item.price.slice(0, -3)}원</p>
                        <p> {item.retail_price.slice(0, -3)}원</p>
                      </div>
                    </div>
                    <div className="SearchPage__ButtonBox">
                      <button onClick={() => BuyBook(item, "buy")}>
                        구매하기
                      </button>
                      <button onClick={() => BuyBook(item, "rent")}>
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
                      className={index == offset ? "button_1" : "button_2"}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
