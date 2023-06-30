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
import Category from "./common/components/Category";
import Swal from "sweetalert2";

function UserInfo() {
  const navigate = useNavigate();

  // 이름 , 프로필사진 , 구 비밀번호 , 새 비밀번호

  const [displayName, setDisplayName] = useState(); // <User> {} as User
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
            apikey: "KDT5_nREmPe9B",
            username: "KDT5_TeamWink",
          },
        }
      );
      Swal.fire("수정 완료!", "", "success");
      window.location.reload();
    } catch (err) {
      console.error("error");
      Swal.fire("수정 실패!", "", "error");
      window.location.reload();
    }
  }

  function uploadImage(event: Event) {
    const files = (event.target as HTMLInputElement).files as FileList;
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // 파일을 base64형식으로 읽음
      reader.addEventListener("load", (e) => {
        setProfileImgBase64((e.target as FileReader).result as string);
      });
    }
  }

  return (
    <>
      <div className="UserInfo-AllLayout">
        <div className="UserInfo-AllLayout__center">
          <div className="LeftContainer">
            <Category />
          </div>

          <div className="RightContainer">
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
                          onChange={(e) => setOldPassword(e.target.value)}
                          required
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
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
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
                          onChange={(e) => setDisplayName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoTitle">프로필 이미지</div>
                      <div className="infoItem">
                        <label htmlFor="file">
                          <div className="btn-upload">파일 업로드하기</div>
                        </label>
                        <input
                          className="infoItemForm"
                          type="file"
                          id="file"
                          name="file"
                          accept="image/*"
                          onChange={uploadImage}
                        />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoItem">
                        <button className="infoFix" type="submit">
                          {" "}
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
      </div>
    </>
  );
}

export default UserInfo;
