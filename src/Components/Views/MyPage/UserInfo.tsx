import { FormEvent, useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "./UserInfo.scss";
import Category from "./common/components/Category";

function UserInfo() {

  // 이름 , 프로필사진 , 구 비밀번호 , 새 비밀번호
  const [displayName, setDisplayName] = useState(""); 
  const [profileImgBase64, setProfileImgBase64] = useState<string>("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  async function submit(e: any) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("displayName", displayName);
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
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

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 1 * 1024 * 1024) {
        alert("업로드 가능한 파일용량을 초과했습니다.");
      } else {
        setSelectedFile(file);
        setFileSize(file.size);
      }
    }
  }

  return (
    <>
      <div className="UserInfo-AllLayout">
        <div className="UserInfo-AllLayout__center">
          <div className="LeftContainer">
            <Category/>
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
                        <label htmlFor="file" className="fileLabel">
                          파일 업로드하기
                          <input
                            className="infoItemForm"
                            type="file"
                            id="file"
                            name="file"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                        <div className="fileText">
                          <p>업로드 가능한 사진 파일의 최대 용량은 1MB입니다.</p>
                          {selectedFile && <div className="fileName">{selectedFile.name}</div>}
                          {fileSize && (
                            <div className="fileSize">{Math.round(fileSize / 1024)} KB</div>
                          )}
                        </div>
                    </div>
                    <div className="infoList">
                      <div className="infoItem">
                        <button 
                          className="infoFix"
                          type="submit"
                        > 회원 정보 수정
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
