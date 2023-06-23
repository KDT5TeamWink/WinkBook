import { useState, useEffect } from "react";
import "./SearchPage.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const { VITE_CLIENT_ID } = import.meta.env;
const ajax = axios.create({
  baseURL: "/cafe24",
  headers: {
    "Content-Type": "application/json",
    "X-Cafe24-Api-Version": "2023-03-01",
    "X-Cafe24-Client-Id": VITE_CLIENT_ID,
  },
});

async function SearchAPI(product_name: string) {
  try {
    const res = await ajax.get("/products", {
      params: {
        product_name: product_name,
      },
    });
    return res.data.products;
  } catch (err) {
    console.log(err);
  }
}

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState<Products>([] as Products);
  const params = useParams();

  const searchInputChange = (e) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    (async () => {
      const result = await SearchAPI(params.keyword);
      setSearch(result);
      console.log(result);
    })();
  }, [params]);

  return (
    <div className="wrapper">
      {/* <input
        type="text"
        placeholder="검색해주세요"
        defaultValue={input}
        onChange={searchInputChange}
      />
      <button onClick={searchUpload}>검색</button> */}
      {search &&
        search.map((v) => {
          return (
            <div className="SearchPage">
              <div className="SearchPage__Images">
                <img src={v.list_image} alt="책표지" />
              </div>
              <div className="SearchPage__Items">
                <h1>{v.product_name}</h1>
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
                <button>구매하기</button>
                <button>대여하기</button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
