// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyPage.scss'

function MyPage () {
    return(
        <>
        <div className='MyPage-AllLayout'>
          <div className="myPageContainer">
            
          <div className="subContainer">
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
            <div className="orderContainer">
              
                <div className="orderText">
                  구매 내역
                </div>
              
                <div className="orderBox">
                  <div className="orderList"></div>
                  <div className="orderList"></div>
                  <div className="orderList"></div>
                  <div className="orderList"></div>
                  <div className="orderList"></div>
                </div>
              
            </div>

            <div className="rentContainer">
              <div className="rent">
                <div className="rentText">대여 내역</div>
                <div className="rentBox">
                  {/* <div className="rentList"></div>
                  <div className="rentList"></div>
                  <div className="rentList"></div>
                  <div className="rentList"></div> */}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </>
    )
}

export default MyPage
