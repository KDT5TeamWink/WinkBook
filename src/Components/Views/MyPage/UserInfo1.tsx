import { FormEvent, useState, useEffect, ChangeEvent, useCallback, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './UserInfo.scss'
import { NONAME } from 'dns';
import { refreshToken } from '@/Apis/Token/token';

function UserInfo () {
  const navigate = useNavigate();


  // 이름 , 프로필사진 , 구 비밀번호 , 새 비밀번호
  const [displayName, setDisplayName] = useState('');
  const [profileImgBase64, setProfileImgBase64] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  async function submit(e) {
    e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("photo", files.length && files[0].uploadedFile);
  //   formData.append("comment", commentValue);
  //   formData.append("content_id", classData.content_id);

  //   await axios({
  //     method: "put",
  //     url: process.env.REACT_APP_STREAMING_COMMENT_URL, //환경변수
  //     data: formData,
  //     headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` }
  //   });
  //   setCommentValue("");
  //   setFiles([]);
  // };

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   setFiles([...files, { uploadedFile: file }]);
  // };


    try {
      const res = await axios.put('https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user', {
        displayName: displayName,           // 새로운 표시 이름
        // profileImgBase64: profileImgBase64, // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
        oldPassword: oldPassword,           // 기존 비밀번호
        newPassword: newPassword,            // 새로운 비밀번호
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
          apikey: 'KDT5_nREmPe9B',
          username: 'KDT5_TeamWink',
        }
      })
      alert('수정완료');
      // console.log("res:",res)
    }catch(err){
      console.error('error');
      alert('수정 실패');
    }
  }


  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if(e.target.files){
      const uploadFile = e.target.files[0]
      const formData = new FormData()
      formData.append('files',uploadFile)
      
      await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user',
        method: 'put',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
          apikey: 'KDT5_nREmPe9B',
          username: 'KDT5_TeamWink',
        },
        data: {
          profileImgBase64: profileImgBase64, // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
          formData,
        }
      });
    }
  }


  // const goToMyPage = () => {
  //   navigate("/MyPage");
  // }

    return(
        <>
        <div className="myPageContainer">
          <div className="subContainer">
            <span>My Page</span>
            <div className="profile">
              
              <img 
              style={{
                width:"120px",
                height:"120px",
                borderRadius:"50%",
                objectFit:"cover",
                border:"1px solid",            
              }}
              src={profileImgBase64} alt=""></img>

              {/* <div className="profilePhoto"></div> */}
              <div className="profileContainer">
                <div className="profileName">
                  <p>{displayName}</p>
                </div>
              </div>
            </div>
            <div className="category">
              <Link to="/mypage">
                <div className='categoryTap'>주문내역조회</div>
              </Link> <br />
              <Link to="/mypage/userinfo">
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
                          onChange={(e)=>{setOldPassword(e.target.value)}}
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
                          onChange={(e)=>{setNewPassword(e.target.value)}}
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
                          onChange={(e)=>{setDisplayName(e.target.value)}}
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
                          name="profileImgBase64" 
                          accept='image/*'
                          
                          value={profileImgBase64}
                          onChange={(e)=>{setProfileImgBase64(e.target.value)}}
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
                          className='infoFix' 
                          type="submit"
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
    )
}

  



export default UserInfo
