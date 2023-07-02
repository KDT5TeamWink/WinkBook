import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import './headers.scss';
import { LogoutForm, TokenMe } from '@/Apis/register';
import { getList } from '@/Apis/productApi';
import Swal from 'sweetalert2';

interface User {
  displayName: string;
  profileImg: string;
}

interface Product {
  product_no: number;
  product_name: string;
  small_image: string;
  price: number;
}

function Header() {
  const defaultProfileImgUrl = '/images/default-profile.jpg';
  const [user, setUser] = useState<User>({ displayName: '', profileImg: '' });
  const [keyword, setKeyWord] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [product, setProductInfo] = useState([]);
  const [showInputButton, setShowInputButton] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
    setShowInputButton(e.target.value.trim() !== '');
  };

  const logoutHandler = () => {
    LogoutForm()
      .then(() => {
        localStorage.removeItem('token');
        Swal.fire('로그아웃 되었습니다!', '다음에 또 만나요!', 'success');
        navigate('/');
      })
      .catch((error: string) => {
        console.log('Logout failed:', error);
      });
  };

  const onSubmit = async () => {
    navigate('/search/' + keyword);
    setShowInputButton(false);
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    const authenticate = async () => {
      try {
        const userData = await TokenMe();

        // 사용자 정보를 업데이트하기 전에 profileImg가 존재하지 않을 경우에만 기본 프로필 이미지 URL을 사용
        setUser((prevUser) => ({
          ...prevUser,
          displayName: userData.displayName,
          profileImg: userData.profileImg || defaultProfileImgUrl,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      authenticate();
    }
  }, [token]);

  const OnKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      if (keyword === '') {
        Swal.fire('검색어를 입력해주세요!', '', 'warning');
      } else {
        onSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
      }
    }
  };
  const handleInputButtonClick = () => {
    if (keyword === '') {
      Swal.fire('검색어를 입력해주세요!', '', 'warning');
    } else {
      onSubmit();
    }
  };

  const filterItems = (searchTerm: string) => {
    const filtered = product.filter((item: Product) =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {
    filterItems(keyword);
  }, [keyword, product]);

  async function getItem() {
    const cate = {
      limit: 100,
    };
    const data = await getList(cate);
    setProductInfo(data);
  }

  useEffect(() => {
    (async () => {
      await getItem();
    })();
  }, []);

  const formatter = new Intl.NumberFormat("ko-KR");

  return (
    <>
      <header className="headerContainer">
        <div className="itemsWrapper">
          <Link to="/" className="logoBox">
            <img src="/images/Wink_logo.png" alt="logo" />
          </Link>
          <div className="searchBox">
            <input
              type="text"
              placeholder="검색"
              onChange={handleInputChange}
              onKeyPress={OnKeyPress}
              onBlur={() => {
                setShowInputButton(false);
              }}
              onFocus={() => {
                setShowInputButton(true);
              }}
            />
            <img
              src="/images/search-icon.png"
              alt="searchicon"
              onClick={handleInputButtonClick}
            />

            {showInputButton && keyword && (
              <div className="Input-Buttom">
                <div className="Input-Buttom__inner">
                  {keyword &&
                    filteredItems.map((item: Product) => {
                      if (item.product_name.trim() !== '') {
                        return (
                          <Link
                            to={`/detail/${item.product_no}`}
                            key={item.product_no}
                            className="Input-Buttom__innerBox"
                          >
                            <div className="Input-Buttom__ImageBox">
                              <img src={item.small_image} alt="searchbookimage" />
                            </div>

                            <div className="Input-Buttom__title">
                              <span>{item.product_name}</span>
                              <span>{formatter.format(item.price)}원</span>
                            </div>
                          </Link>
                        );
                      } else {
                        return null;
                      }
                    })}
                </div>
              </div>
            )}
          </div>

          <div className="Header-box">
            <Link className="Header-box__text" to="/cart">
              장바구니
            </Link>
            <Link className="Header-box__text" to="/mypage">
              마이페이지
            </Link>
            {token ? (
              <div className="Header-box__text">
                <div className="Header-box__logout" onClick={logoutHandler}>
                  로그아웃
                </div>
                <div className="cart">
                  <img className="cartPhoto" src={user.profileImg} />
                </div>
              </div>
            ) : (
              <>
                <Link className="Header-box__text" to="/join">
                  <p>회원가입</p>
                </Link>
                <Link className="Header-box__text" to="/login">
                  <p>로그인</p>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
