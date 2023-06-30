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

export default function SearchPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<Products>([] as Products);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const params = useParams();

  async function SearchAPI(product_name: string) {
    try {
      const res = await ajax.get("/products", {
        params: {
          product_name: product_name,
          offset: offset * 10,
        },
      });
      // console.log(res.data.products);
      return res.data.products;
    } catch (err) {
      console.log(err);
    }
  }

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
      // console.log(result);
      window.scrollTo(0, 0);
    })();
  }, [params, offset]);
  console.log("search:", search.length);

  const BuyBook = (search: string, type: string) => {
    console.log(search);
    let Cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (Cart.some((item) => item.product_no === search.product_no)) {
      Swal.fire("이미 장바구니에 담으셨습니다.", "", "warning");
      return false;
    }

    if (type === "rent") {
      search.rentdate = 7;
    }

    search.gubun = type;
    Cart.push(search);
    Cart = Array.from(new Set(Cart));
    Cart = [...Cart];
    localStorage.setItem("cart", JSON.stringify(Cart));
    Swal.fire("장바구니에 담겼습니다!", "", "success");
    navigate("/cart");
  };

  return (
    <>
      {search.length === 0 ? (
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
                      <button onClick={() => BuyBook(v, "buy")}>
                        구매하기
                      </button>
                      <button onClick={() => BuyBook(v, "rent")}>
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
