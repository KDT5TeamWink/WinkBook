import { useState } from 'react';
import './SearchPage.scss';
import axios from 'axios';
// const dummy = [
//   {
//     list_image:
//       'https://teamwink.cafe24.com/web/product/big/202306/6543ff6b482a7dfbf4275363d79e01dc.png',
//     product_name: '피나 바우쉬(끝나지 않을 몸짓)',
//     summary_description:
//       "'현대 예술의 거장' 시리즈는 20세기를 전후한 문화 예술계에큰 영향력을 끼친 국내외 거장 아티스트의 평전으로 구성된다.",
//     retail_price: '20000',
//     price: '18000',
//   },
//   {
//     list_image:
//       'https://teamwink.cafe24.com/web/product/big/202306/23ee454750818ac377870ea574e832bd.png',
//     product_name: '일향 강우방의 예술 혁명일지',
//     summary_description:
//       '우리나라 미술사학계를 대표하는 원로이자 현역으로 활동하는 강우방(83)의 자전적 에세이다.',
//     retail_price: '20000',
//     price: '18000',
//   },
//   {
//     list_image:
//       'https://teamwink.cafe24.com/web/product/big/202306/fd86c152ea5616135b40747f895a576c.png',
//     product_name: '예술이 필요한 시간(전시 디자이너 에세이)',
//     summary_description:
//       '《에드워드 호퍼: 길 위에서》를 비롯해 까르띠에 현대미술재단 소장품전 《하이라이트》, 《빛: 영국 테이트미술관 특별전》 등 해외 유명 걸작전을 담당해온 전시 디자이너의 시선을 담아낸 책이다',
//     retail_price: '20000',
//     price: '18000',
//   },
//   {
//     list_image:
//       'https://teamwink.cafe24.com/web/product/big/202306/abc3fc36c0dad20454ad0433b4c662c5.png',
//     product_name: '예썰의 전당: 서양미술 편(예술에 관한 세상의 모든 썰)',
//     summary_description:
//       "KBS 화제의 교양 프로그램 '예썰의 전당'을 책으로 만난다.",
//     retail_price: '20000',
//     price: '18000',
//   },
//   {
//     list_image:
//       'https://teamwink.cafe24.com/web/product/big/202306/84a72535341fa2d5966129b260f97857.png',
//     product_name:
//       '생성 예술의 시대(챗GPT가 말하고 DALL E가 그리는 인공지능 시대의 예술)',
//     summary_description:
//       '인공지능을 위시한 이 시대 가장 첨예한 신기술에 항상 주목해 왔던 뇌과학자 김대식이 이번에는 생성AI를 활용한 AI 그림의 가능성에 눈을 돌렸다',
//     retail_price: '20000',
//     price: '18000',
//   },
// ];
const { VITE_CLIENT_ID } = import.meta.env;
const ajax = axios.create({
  baseURL: '/cafe24',
  headers: {
    'Content-Type': 'application/json',
    'X-Cafe24-Api-Version': '2023-03-01',
    'X-Cafe24-Client-Id': VITE_CLIENT_ID,
  },
});
async function SearchAPI(product_name: string) {
  try {
    const res = await ajax.get('/products', {
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
  const [input, setInput] = useState('');
  const [search, setSearch] = useState<Products>([] as Products);

  const searchInputChange = (e) => {
    setInput(e.target.value);
  };

  const searchUpload = async () => {
    const result = await SearchAPI(input);
    setSearch(result);
    console.log(result);
  };

  return (
    <div className="wrapper">
      <input
        type="text"
        placeholder="검색해주세요"
        defaultValue={input}
        onChange={searchInputChange}
      />
      <button onClick={searchUpload}>검색</button>
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
