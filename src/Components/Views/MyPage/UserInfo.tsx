import {
  FormEvent,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UserInfo.scss";
import { NONAME } from "dns";

function UserInfo() {
  const navigate = useNavigate();

  // 이름 , 프로필사진 , 구 비밀번호 , 새 비밀번호
  const [displayName, setDisplayName] = useState("");
  const [profileImgBase64, setProfileImgBase64] = useState<string>("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function submit(e: any) {
    e.preventDefault();
    try {
      const res = await axios.put(
        "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user",
        {
          displayName: displayName, // 새로운 표시 이름
          profileImgBase64: profileImgBase64, // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
          oldPassword: oldPassword, // 기존 비밀번호
          newPassword: newPassword, // 새로운 비밀번호
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            //"Content-Type": "multipart/form-data",
            apikey: "KDT5_nREmPe9B",
            username: "KDT5_TeamWink",
          },
        }
      );
      console.log("res:", res.data);
      alert("수정완료");
    } catch (err) {
      console.error("error");
      alert("수정 실패");
    }
  }

  // const goToMyPage = () => {
  //   navigate("/MyPage");
  // }

  return (
    <>
      <div className="myPageeContainer">
        <div className="subContainer">
          <span>My Page</span>
          <div className="profile">
            <img
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid",
              }}
              src={profileImgBase64}
              alt=""
            ></img>

            {/* <div className="profilePhoto"></div> */}
            <div className="profileContainer">
              <div className="profileName">
                <p>{displayName}</p>
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
            <Link to="/">
              <div className="categoryTap">배송지 관리</div>
            </Link>{" "}
            <br />
            <Link to="/">
              <div className="categoryTap">결제수단 관리</div>
            </Link>{" "}
            <br />
            <Link to="/">
              <div className="categoryTap">1:1 문의</div>
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
                        type="password"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={(e) => {
                          setOldPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="infoList">
                    <div className="infoTitle">새 비밀번호</div>
                    <div className="infoItem">
                      <input
                        className="infoItemForm"
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
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
                        onChange={(e) => {
                          setDisplayName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="infoList">
                    <div className="infoTitle">프로필 이미지</div>
                    <div className="infoItem">
                      {/* <button className='infoPic'>사진 업로드</button> */}
                      {/* <input type="file" style={{ display: "none" }} ref={imageInput} />
                        // <button onClick={onCickImageUpload}>이미지업로드</button> */}
                      <input
                        className="infoItemForm"
                        type="file"
                        id="file"
                        name="profileImgBase64"
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          console.log("111111", e.target.files);
                          //console.log("files:", files);
                          var reader = new FileReader();
                          reader.onload = function (upload) {
                            if (upload.target != null) {
                              console.log(
                                "asd:",
                                upload.target.result?.toString()
                              );
                              setProfileImgBase64(
                                upload.target.result
                                  ? upload.target.result.toString()
                                  : ""
                              );
                            }
                          };
                          if (files != null) {
                            reader.readAsDataURL(files[0]);
                          }
                          //setProfileImgBase64(files);

                          console.log("profileImgBase64:", profileImgBase64);
                        }}
                      />
                      {/* <form>
                            <label htmlFor="profile-upload" />
                            <input type="file" id="profile-upload" accept="image/*" onChange={onChangeImg}/>
                          </form> */}
                    </div>
                  </div>
                  <div className="infoList">
                    <div className="infoItem">
                      <button
                        className="infoFix"
                        type="submit"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                        // onClick={goToMyPage}
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
