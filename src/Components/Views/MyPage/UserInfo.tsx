// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './userInfo.scss'

function userInfo () {
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
                        <input className="infoItemForm" placeholder="아이디를 입력해 주세요" type="text" />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoTitle">비밀번호</div>
                      <div className="infoItem">
                        <input className="infoItemForm" placeholder="비밀번호는 8~20자의 영문 대/소문자, 숫자, 특수문자를 포함하세요" type="text" />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoTitle">닉네임</div>
                      <div className="infoItem">
                        <input className="infoItemForm" placeholder="닉네임을 입력해 주세요" type="text" />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoTitle">한줄 소개</div>
                      <div className="infoItem">
                        <input className="infoItemForm" placeholder="자신을 한줄로 소개하세요" type="text" />
                      </div>
                    </div>
                    <div className="infoList">
                      <div className="infoTitle">프로필 이미지</div>
                      <div className="infoItem">
                        <button className='infoPic'>사진 업로드</button>
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

export default userInfo
