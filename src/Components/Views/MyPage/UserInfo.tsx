import { FormEvent, useState, useEffect, ChangeEvent, useCallback, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UserInfo.scss";
import { ReadStream } from "fs";

interface User {
  displayName: string // 사용자 표시 이름
  profileImg: string // 사용자 프로필 이미지 URL
}

function UserInfo() {
  const navigate = useNavigate();

  // 이름 , 프로필사진 , 구 비밀번호 , 새 비밀번호
  const [user, setUser] =useState<User>({} as User)
  const [displayName, setDisplayName] = useState(); // <User> {} as User
  const [profileImgBase64, setProfileImgBase64] = useState<string>("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");


  async function submit(e: any) {
    e.preventDefault();
    try {
      const res = await axios.put("https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user", {
          displayName: displayName, // 새로운 표시 이름
          profileImgBase64: profileImgBase64, // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
          oldPassword: oldPassword, // 기존 비밀번호
          newPassword: newPassword, // 새로운 비밀번호
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            apikey: "KDT5_nREmPe9B",
            username: "KDT5_TeamWink",
          },
        },
      );
      alert("수정완료");
      window.location.reload();
    } catch (err) {
      console.error("error");
      alert("수정 실패");
      window.location.reload(); 
    }
  }

  function uploadImage(event: Event){
    const files = (event.target as HTMLInputElement).files as FileList
    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)  // 파일을 base64형식으로 읽음
      reader.addEventListener('load', e => {
        setProfileImgBase64((e.target as FileReader).result as string)
      })
    }
  }

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
      <div className="myPageContainer">
        <div className="subContainer">
          <div className="subText">My Page</div>
          <div className="profile">
            <img 
              className="profilePhoto"
              src={user.profileImg} 
              alt="프로필사진" 
            />
            <div className="profileContainer">
              <div className="profileName">
                <p>{user.displayName}</p>
              </div>
            </div>
          </div>
          <div className="category">
            <Link to="/mypage">
              <div className="categoryTap">주문내역조회</div>
            </Link>{" "}
            <br />
            <Link to="/mypage/userinfo">
              <div className="categoryTap">회원정보 수정</div>
            </Link>{" "}
            <br />
          </div>
        </div>

        <div className="detailsContainer">
          <div className="infoContainer">
            <div className="info">
              <div className="infoTag">
                <div className="infoText">회원정보 수정</div>
              </div>
              <div className="infoBox">
                <form onSubmit={submit}>
                  <div className="infoList">
                    <div className="infoTitle">기존 비밀번호</div>
                    <div className="infoItem">
                      <input
                        className="infoItemForm"
                        placeholder="비밀번호를 입력해주세요"
                        type="text"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={(e) => {setOldPassword(e.target.value)}}
                      />
                    </div>
                  </div>
                  <div className="infoList">
                    <div className="infoTitle">새 비밀번호</div>
                    <div className="infoItem">
                      <input
                        className="infoItemForm"
                        placeholder="비밀번호를 입력해주세요"
                        type="text"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => {setNewPassword(e.target.value)}}
                      />
                    </div>
                  </div>
                  <div className="infoList">
                    <div className="infoTitle">닉네임 변경</div>
                    <div className="infoItem">
                      <input
                        className="infoItemForm"
                        placeholder="닉네임을 입력해주세요"
                        type="text"
                        name="disPlayname"
                        value={displayName}
                        onChange={(e) => {setDisplayName(e.target.value)}}
                      />
                    </div>
                  </div>
                  <div className="infoList">
                    <div className="infoTitle">프로필 이미지</div>
                    <div className="infoItem">
                      <input
                        className="infoItemForm"
                        type="file"
                        id="file"
                        name="profileImgBase64"
                        accept="image/*"
                        onChange={uploadImage}
                      />
                    </div>
                  </div>
                  <div className="infoList">
                    <div className="infoItem">
                      <button 
                        onClick={authenticate}
                        className="infoFix"
                        type="submit"
                      >
                        회원 정보 수정
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
