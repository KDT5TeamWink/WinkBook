import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./headers.scss";
import { LogoutForm } from "@/Apis/register";

interface User {
  displayName: string // 사용자 표시 이름
  profileImg: string // 사용자 프로필 이미지 URL
}

function Header() {
  const [user, setUser] =useState<User>({} as User)
  //const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const navigate = useNavigate();

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

  const token = localStorage.getItem('token');

  // async function authenticate() {
  //   axios('https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',{
  //     method:"post",
  //     headers:{
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //       apikey: "KDT5_nREmPe9B",
  //       username: "KDT5_TeamWink",
  //     },
  //   }).then((res) => {
  //     console.log("res:",res);
  //     setUser(res.data);
  //   })
  // }

  // useEffect(() => {
  //   authenticate()
  // }, [])

  

  return (
    <>
      <header className="headerContainer">
        <div className="itemsWrapper">
          <Link to="/" className="logoBox">
            <img src="/public/images/Wink_logo.png" alt="logo" />
          </Link>
          <div className="searchBox">
            <input type="text" placeholder="검색" />
          </div>

          <div className="Header-box">
            <Link className="Header-box__text" to="/cart">
              장바구니
            </Link>
            <Link className="Header-box__text" to="/mypage">
              마이페이지
            </Link>
            {token ? (
              <div className="Header-box__text" >
                <div className="Header-box__logout" onClick={logoutHandler}>로그아웃</div>
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
