import { useState } from "react";
import "./UserInfo.scss";
import { InfoToken } from "@/Apis/register";
import Category from "./common/components/Category";
import Swal from "sweetalert2";

function UserInfo() {
  const [displayName, setDisplayName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function submit(e: any) {
    e.preventDefault();
    try {
      if (!displayName || !selectedImage || !oldPassword || !newPassword) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      await InfoToken(displayName, selectedImage, oldPassword, newPassword);
      Swal.fire("수정 완료!", "", "success");
      window.location.reload();
    } catch (err) {
      console.error("error");
      Swal.fire("수정 실패!", "", "error");
      window.location.reload();
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileSizeInBytes = file.size;
      const maxSizeInBytes = 1 * 1024 * 1024;

      if (fileSizeInBytes > maxSizeInBytes) {
        alert("파일 용량은 1MB를 초과할 수 없습니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
                      <div className="infoImage-container">
                        <div className="infoImage-container__text">
                          프로필 이미지
                        </div>
                        <div className="infoImageUpload">
                          <label htmlFor="file" className="custom-file-input">
                            <span>파일 업로드</span>
                            <input
                              type="file"
                              id="file"
                              name="file"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                        <span className="fileMB">
                          파일 용량은 1MB를 초과할 수 없습니다.
                        </span>
                      </div>

                      <div className="infoList">
                        <div className="infoItem">
                          <button className="infoFix" type="submit">
                            {" "}
                            회원 정보 수정
                          </button>
                        </div>
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
