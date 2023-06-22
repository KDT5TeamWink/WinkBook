import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
//import { useSelector } from 'react-redux';
import "./headers.scss";
//import { RootState } from '../_reducers';
//import { useDispatch } from 'react-redux';
//import { logoutUser } from '_reducers/user_reducer';
import { LogoutForm } from "@/Apis/register";

interface User {
  displayName: string // 사용자 표시 이름
  profileImg: string // 사용자 프로필 이미지 URL
}

function Header() {
  // const userState = useSelector((state) => state.user);
  // const accessToken = userState.accessToken;
  // console.log("1", accessToken);
  // const dispatch = useDispatch();
  const [user, setUser] =useState<User>({} as User)

  const navigate = useNavigate();

  const logoutHandler = () => {
    LogoutForm()
      .then(() => {
        localStorage.removeItem("token");
        alert("로그아웃 되셨습니다");
        navigate("/");
        // location.reload();
      })
      .catch((error: string) => {
        console.log("Logout failed:", error);
      });
  };

  const token = localStorage.getItem("token");


  async function authenticate() {
    axios('https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',{
      method:"post",
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamWink",
      },
    }).then((res) => {
      console.log("res:",res);
      setUser(res.data);
    })
  }

  
  useEffect(() => {
    authenticate()
  }, [])

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
              // <div className="Header-box__text" onClick={logoutHandler}>
              <div className="Header-box__text" >
                <div className="Header-box__logout" onClick={logoutHandler}>로그아웃</div>
                <div className="cart">
                  <img 
                    className="cartPhoto"
                    src={user.profileImg} 
                  />
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
