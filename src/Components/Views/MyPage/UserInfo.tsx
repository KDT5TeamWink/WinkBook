import { FormEvent, useState, useEffect, ChangeEvent, useCallback, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './UserInfo.scss'
import { NONAME } from 'dns';

function UserInfo() {
  const navigate = useNavigate();

  // 이름 , 프로필사진 , 구 비밀번호 , 새 비밀번호
  const [displayName, setDisplayName] = useState('');
  const [profileImgBase64, setProfileImgBase64] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  //비밀번호 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isOldPassword, setIsOldPassword] = useState(false);
  const [isNewPasswordConfirm, setIsNewPasswordConfirm] = useState(false);

  //오류 메세지 저장
  const [nameMessage, setNameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');



  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.put('https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user', {
        displayName: displayName,           // 새로운 표시 이름
        profileImgBase64: profileImgBase64, // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
        oldPassword: oldPassword,           // 기존 비밀번호
        newPassword: newPassword            // 새로운 비밀번호
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          apikey: 'KDT5_nREmPe9B',
          username: 'KDT5_TeamWink',
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 21) {
      setNameMessage('2글자 이상 21글자 미만으로 입력해주세요.');
      setIsName(false);
    } else {
      setNameMessage('올바른 이름 형식입니다 ');
      setIsName(true);
    }
  }, []);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordCurrent = e.target.value;
      setOldPassword(passwordCurrent);

      if (!PwCheck(passwordCurrent)) {
        setPasswordMessage('8자리 이상 입력해주세요.');
        setIsOldPassword(false);
      } else {
        setPasswordMessage('안전한 비밀번호에요 ');
        setIsOldPassword(true);
      }
    },
    [oldPassword]
  );

  const onChangePasswordConfirm = (
    password: any,
    confirmPassword: any,
    setPasswordConfirmMessage: any,
    setIsPasswordConfirm: any
  ) => {
    if (password === confirmPassword) {
      setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요.');
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage('비밀번호가 틀립니다. 다시 입력해주세요.');
      setIsPasswordConfirm(false);
    }
  };

  const onPasswordConfirmChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setNewPassword(passwordConfirmCurrent);
      onChangePasswordConfirm(
        oldPassword,
        passwordConfirmCurrent,
        setPasswordConfirmMessage,
        setIsNewPasswordConfirm
      );
    },
    [oldPassword]
  );


    return(
        <>
        <div className="myPageContainer">
          <div className="subContainer">
            <span>My Page</span>
            <div className="profile">
              <div className="profilePhoto"></div>
              <div className="profileContainer">
                <div className="profileName">
                  <p>닉네임{displayName}</p>
                </div>
                {/* <div className="profileText">
                  <div>
                  <p>자기소개</p>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="category">
              <Link to="/">
                <div className='categoryTap'>주문내역조회</div>
              </Link> <br />
              <Link to="/">
                <div className='categoryTap'>회원정보 수정</div>
              </Link> <br />
              <Link to="/">
                <div className='categoryTap'>배송지 관리</div>
              </Link> <br />
              <Link to="/">
                <div className='categoryTap'>결제수단 관리</div>
              </Link> <br />
              <Link to="/">
                <div className='categoryTap'>1:1 문의</div>
              </Link> <br />
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
                          onChange={onChangePassword}
                        /><br></br>
                        {oldPassword.length > 0 && (
                          <span className={`message ${isOldPassword ? 'success' : 'error'}`}>
                            {passwordMessage}
                          </span>
                        )}
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
                          onChange={onPasswordConfirmChange}
                        /><br></br>
                        {newPassword.length > 0 && (
                          <span
                            className={`message ${
                              isNewPasswordConfirm ? 'success' : 'error'
                            }`}
                          >
                            {passwordConfirmMessage}
                          </span>
                        )}
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
                          onChange={onChangeName}
                        /><br></br>
                        {displayName.length > 0 && (
                          <span className={`message ${isName ? 'success' : 'error'}`}>
                            {nameMessage}
                          </span>
                        )}
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
                          name="profileImgBase64" 
                          accept='image/*'
                          value={profileImgBase64}
                          onChange={(e)=>{setProfileImgBase64(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoItem">
                      {/* <input className="infoFix" type="submit" /> */}
                        <button 
                          className='infoFix' 
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
      </div>
    </>
  );
}

export default UserInfo;
