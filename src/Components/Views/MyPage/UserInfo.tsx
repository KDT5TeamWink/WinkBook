// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormEvent, useState, useRef, ChangeEvent }  from 'react';  
import './UserInfo.scss'

function UserInfo () {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [Introduce, setIntroduce] = useState<string>('');
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  
  
  const fileInput = useRef(null)


  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePW = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  
  const onChangeIntroduce = (e: ChangeEvent<HTMLInputElement>) => {
    setIntroduce(e.target.value);
  };


    return(
        <>
        <div className="myPageContainer">
          <div className="subContainer">
            <span>My Page</span>
            <div className="profile">
              <div className="profilePhoto"></div>
              <div className="profileContainer">
                <div className="profileName">
                  <p>닉네임</p>
                </div>
                <div className="profileText">
                  <p>프로필 자기소개란입니다.</p>
                </div>
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
                  <form>
                    <div className="infoList">
                      <div className="infoTitle">아이디</div>
                      <div className="infoItem">
                        {/* <input className="infoItemForm" placeholder="아이디를 입력해 주세요" type="text" /> */}
                        <input
                          className="infoItemForm"
                          placeholder="이메일을 입력하세요"
                          autoComplete="off"
                          type='text'
                          name='email'
                          value={email}
                          onChange={onChangeEmail}
                        />  
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoTitle">비밀번호</div>
                      <div className="infoItem">
                        {/* <input className="infoItemForm" placeholder="8~20자의 비밀번호를 입력해 주세요" type="text" /> */}
                        <input
                          className="infoItemForm"
                          placeholder="8~20자사이의 비밀번호를 입력해 주세요"
                          autoComplete="off"
                          type='text'
                          name='password'
                          value={password}
                          onChange={onChangePW}
                        />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoTitle">닉네임</div>
                      <div className="infoItem">
                        {/* <input className="infoItemForm" placeholder="닉네임을 입력해 주세요" type="text" /> */}
                        <input
                          className="infoItemForm"
                          placeholder="닉네임을 입력해 주세요"
                          autoComplete="off"
                          type='text'
                          name='name'
                          value={name}
                          onChange={onChangeName}
                        />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoTitle">한줄 소개</div>
                      <div className="infoItem">
                        {/* <input className="infoItemForm" placeholder="자신을 한줄로 소개하세요" type="text" /> */}
                        <input
                          className="infoItemForm"
                          placeholder="자신을 한 줄로 소개하세요"
                          autoComplete="off"
                          type='text'
                          name='name'
                          value={Introduce}
                          onChange={onChangeIntroduce}
                        />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoTitle">프로필 이미지</div>
                      <div className="infoItem">
                        {/* <button className='infoPic'>사진 업로드</button> */}
                        <input type="file" />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoItem">
                        <button className='infoFix' type="submit">회원 정보 수정</button>
                      </div>
                    </div>

                  </form>
                  

                </div>
                

              </div>
            </div>




            {/* <div className="rentContainer">
              <div className="rent">
                <div className="rentText">대여 내역</div>
                <div className="rentBox">
                  <div className="rentList"></div>
                  <div className="rentList"></div>
                  <div className="rentList"></div>
                  <div className="rentList"></div>
                </div>
              </div>
            </div> */}



          </div>


        </div>

        </>
    )
}

export default UserInfo
