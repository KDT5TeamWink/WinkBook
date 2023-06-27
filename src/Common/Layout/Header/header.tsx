import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./headers.scss";
import { LogoutForm } from "@/Apis/register";
import SearchPage from "@/Components/Views/SearchPage/SearchPage";

interface User {
  displayName: string; // 사용자 표시 이름
  profileImg: string; // 사용자 프로필 이미지 URL
}

function Header() {
  // const userState = useSelector((state) => state.user);
  // const accessToken = userState.accessToken;
  // console.log("1", accessToken);
  // const dispatch = useDispatch();
  const [user, setUser] = useState<User>({} as User);
  const [search, setSearch] = useState<Products>([] as Products);
  const [input, setInput] = useState("");
  const [keyword, setKeyWord] = useState("");

  const navigate = useNavigate();

  // const searchUpload = async () => {
  //   const result = await SearchAPI(input);
  //   setSearch(result);
  //   console.log(result);
  // };

  const logoutHandler = () => {
    LogoutForm()
      .then(() => {
        localStorage.removeItem("token");
        alert("로그아웃 되셨습니다");
        navigate("/");
      })
      .catch((error: string) => {
        console.log("Logout failed:", error);
      });
  };
  const onSubmit = async () => {
    // window.location.href = "/search/" + keyword;
    navigate("/search/" + keyword);
  };

  const token = localStorage.getItem("token");

  const OnKeyPress = (e: any) => {
    if (keyword === "") {
      alert("검색어를 입력해주세요");
    } else if (e.key === "Enter") {
      onSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <>
      <header className="headerContainer">
        <div className="itemsWrapper">
          <Link to="/" className="logoBox">
            <img src="/public/images/Wink_logo.png" alt="logo" />
          </Link>
          <div className="searchBox">
            <input
              type="text"
              placeholder="검색"
              onChange={(e) => {
                setKeyWord(e.target.value);
              }}
              onKeyPress={OnKeyPress}
            />
            {/* <button
              onClick={() => {
                onSubmit();
              }}
            >
              검색
            </button> */}
            <img
              src="/public/images/search-icon.png"
              alt="searchicon"
              onClick={() => {
                if (keyword === "") {
                  alert("검색어를 입력해주세요");
                } else {
                  onSubmit();
                }
              }}
            />
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
                  <img src={user.profileImg} />
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
