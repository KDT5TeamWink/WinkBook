import './login.scss'
import { useNavigate, Link } from 'react-router-dom';
//import { useDispatch } from "react-redux";
import { FormEvent, useState, ChangeEvent }  from 'react';  
//import { loginUser } from '_reducers/user_reducer';
import { LoginForm } from 'Apis/apis';

  
function Login() {

  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');



  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  interface DataToSubmit {
    email: string // 사용자 아이디 (필수!)
    password: string // 사용자 비밀번호 (필수!)
  }


  async function Signin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    if (email === undefined || email === "" || email === null) {
      alert('이메일을 입력해주세요.');
      return false;
    }
  
    if (password === undefined || password === "" || password === null) {
      alert('비밀번호를 입력해주세요.');
      return false;
    }
  
    const dataToSubmit: DataToSubmit = {
      email: email,
      password: password
    };

    try {
      
      //const data = await dispatch(loginUser(dataToSubmit));
      const data = await LoginForm(email, password)
      console.log(data);

      if(data.accessToken){
        alert("로그인 되었습니다!");
        window.localStorage.setItem('token', data.accessToken);
        navigate("/");
      } else {
        alert("로그인에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
  

  return(
    <>
    <div className="LoginContainer">
      <form className="loginContainer-inner" onSubmit={Signin}>
        <div className="JoinTextContainer">
          <p>로그인</p>
        </div>

        <div className="formBox">
          <div className='formBox-inner'>
            <input
              placeholder="이메일을 입력하세요"
              autoComplete="off"
              type='text'
              name='email'
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className='formBox-inner'>
            <input
              placeholder="비밀번호를 입력하세요"
              autoComplete="off"
              type='text'
              name='password'
              value={password}
              onChange={onChangeName}
            />
          </div>

          <div className='buttonContainer'>     
            <button className="buttonBox" type='submit'>등록</button>
          </div>
        </div>
      </form> 
      <div className='bottomText'>
        <p>아이디가 없으신가요?</p> 
          <Link style={{ textDecoration: 'none', color: 'black', marginLeft:'20px' }} to="/join">
            <p>회원가입 하러 가기!</p>
          </Link>
      </div>
    </div>  
    </>
  )
}
export default Login