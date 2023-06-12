import { Link, useNavigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import './headers.scss';
//import { RootState } from '../_reducers';
//import { useDispatch } from 'react-redux';
//import { logoutUser } from '_reducers/user_reducer';
import { LogoutForm } from '@/Apis/register';

function Header() {
  // const userState = useSelector((state) => state.user);
  // const accessToken = userState.accessToken;
  // console.log("1", accessToken);
  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    LogoutForm()
      .then(() => {
        localStorage.removeItem('token');
        alert('로그아웃 되셨습니다');
        navigate('/');
      })
      .catch((error: string) => {
        console.log('Logout failed:', error);
      });
  };

  const token = localStorage.getItem('token');

  return (
    <>
      <header className="headerContainer">
        <div className="itemsWrapper">
          <Link to="/" className="logoBox">
            <img src="/public/images/Wink_logo.png" alt="logo" />
          </Link>
          <div className="searchBox">
            <input type="text" />
          </div>

          <div className="Header-box">
            <Link className="Header-box__text" to="/cart">
              장바구니
            </Link>
            <Link className="Header-box__text" to="/mypage">
              마이페이지
            </Link>
            {token ? (
              <div className="Header-box__text" onClick={logoutHandler}>
                <p>로그아웃</p>
              </div>
            ) : (
              <>
                <Link className="Header-box__text" to="/join">
                  <p>회원가입</p>
                </Link>
                <Link className="Header-box__text" to="/login">
                  <p>로그인</p>
                </Link>
              </>
            )}
            <div className="cart"></div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
