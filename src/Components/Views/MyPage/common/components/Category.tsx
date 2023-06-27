import './Category.scss'
import { Link } from "react-router-dom";
import {useEffect } from 'react';

const Category = () => {

  useEffect(() => {
    if (location.pathname === "/mypage") {
      document.querySelector(".LeftContainer-category__order")?.classList.add("active");
      document.querySelector(".LeftContainer-category__infoTap")?.classList.remove("active");
    } else if (location.pathname === "/mypage/userinfo") {
      document.querySelector(".LeftContainer-category__order")?.classList.remove("active");
      document.querySelector(".LeftContainer-category__infoTap")?.classList.add("active");
    } 
  }, [location]);

  return (
    <>
      <div className="LeftContainer-profile">
        <div className="LeftContainer-profile__Photo"></div>
        <div className="LeftContainer-profile__box">
          <div className="LeftContainer-profile__text">
            <p>닉네임</p>
          </div>

          <div className="LeftContainer-profile__name">
            <p>프로필 자기소개란입니다.</p>
          </div>
        </div>
      </div>
      <div className="LeftContainer-category">
      <Link to="/mypage"> 
        <div className={`LeftContainer-category__order${location.pathname === "/mypage" ? " active" : ""}`}>
              주문내역조회
        </div>
      </Link>
      <Link to="/mypage/userinfo">

      <div className={`LeftContainer-category__infoTap${location.pathname === "/mypage/userinfo" ? " active" : ""}`}>
              회원정보 수정
      </div>
      </Link>
    </div>
    </>
  );
};

export default Category;