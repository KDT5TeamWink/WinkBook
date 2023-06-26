import './Category.scss'
import { NavLink} from "react-router-dom";
import { FormEvent, useState, useEffect, ChangeEvent, useCallback, useRef } from "react";
import axios from "axios";

interface User {
  displayName: string; // 사용자 표시 이름
  profileImg: string; // 사용자 프로필 이미지 URL
}

const Category = () => {

// 기본 프로필 이미지 URL
const defaultProfileImgUrl = "/public/images/default-profile.jpg";


const [user, setUser] = useState<User>({ displayName: "", profileImg: defaultProfileImgUrl });


useEffect(() => {
  const authenticate = async () => {
    try {
      const response = await axios.post(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            apikey: "KDT5_nREmPe9B",
            username: "KDT5_TeamWink",
          },
        }
      );
      const userData = response.data;

      // 사용자 정보를 업데이트하기 전에 profileImg가 존재하지 않을 경우에만 기본 프로필 이미지 URL을 사용
      setUser((prevUser) => ({
        ...prevUser,
        displayName: userData.displayName,
        profileImg: userData.profileImg || defaultProfileImgUrl,
      }));
    } catch (error) {
      console.error(error);
      // 오류 처리
    }
  };

  authenticate();
}, []);


  return (
    <>
      <div className="LeftContainer-profile">
        {/* <div className="LeftContainer-profilePhoto"> */}
          <img 
            className="LeftContainer-profilePhoto"
            src={user.profileImg} 
            alt="프로필사진" 
          />
        {/* </div> */}
        <div className="LeftContainer-profilebox">
          <div className="LeftContainer-profiletext">
            <p>{user?.displayName}</p>
          </div>
        </div>
      </div>


      
      <div className="LeftContainer-category">
        <NavLink to="/mypage" activeClassName="active">
          <div className="categoryTap">주문내역조회</div>
          {/* 주문내역조회 */}
        </NavLink>
        <NavLink to="/mypage/userinfo" activeClassName="active">
          <div className="categoryTap">회원정보 수정</div>
          {/* 회원정보 수정 */}
        </NavLink>





      </div>
    </>
  );
};

export default Category;