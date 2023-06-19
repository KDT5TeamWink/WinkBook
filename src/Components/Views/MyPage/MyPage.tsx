import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyPage.scss'

function MyPage () {

  /* 구현해야할일
  1.  아임포트 결제 내역을 조회해오기 위해서는 acesstoken 이 필요함. 
  2. 이 acesstoken 을 발급받기 위해서는 POST /users/getToken 을 사용해 헤더에 API 키, API secret  보낸후 
  발급받음. 
  3. 발급받은 acesstoken 은 30분마다 새롭게 발급받아야함. 
  4. 그럼 헤더에 보내는 관리자 api키 ,  API secret 은 고정으로 있기때문에  만약 30분이 지나 기존 
  acesstoken 맞지 않을때 , 기존 acesstoken 값을 삭제함과 동시에 새로 발급 받을수 있도록 조건식을 써야함.
  5. 그렇게 30분마다 기존 토큰값을 삭세한후 새로운 토큰 값을 사용해 결제 내역을 받아옴
  ()
  */

  useEffect(() => {
    async function fetchdata() {
      const { data } = await axios.get(
        "/iamport/status/all?limit=20&sorting=-started&_token=a293f3ff21b8cfdc954b49b6957eef717c6e580a"
      );
      console.log("data:", data);
    }
    fetchdata();
  }, []);







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
              <Link to="/">
                <div className='categoryTap'>주문내역조회</div>
              </Link> <br />
              <Link to="/userinfo">
                <div className='categoryTap'>회원정보 수정</div>
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
