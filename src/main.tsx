import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem("token");

// 토큰을 저장하는 함수
const saveTokenToLocalStorage = (token:string) => {
  localStorage.setItem("token", token);
};

// 토큰을 제거하는 함수
const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

if (token) {
  saveTokenToLocalStorage(token);
} else {
  removeTokenFromLocalStorage();
}

// const navigate = useNavigate();

// 토큰 갱신 인터셉터
axios.interceptors.response.use(
  response => {
    // 응답 처리
    return response;
  },
  error => {
    if (error.response.status === 401) {
      console.log("401 에러 발생: 토큰 제거하지 않음");
      alert("401 에러 발생");
      // 401 에러 발생 시 토큰을 제거하는 로직 추가
      removeTokenFromLocalStorage();
        // 로그인 페이지로 리디렉션
        // navigate('/login');
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <App />
//   );









// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import App from "./App";
// import "./index.scss";
// import axios from "axios";
// import Login from "@/Common/Form/Login/login";
// const token = localStorage.getItem("token");

// // 토큰을 저장하는 함수
// const saveTokenToLocalStorage = (token) => {
//   localStorage.setItem("token", token);
// };

// // 토큰을 제거하는 함수
// const removeTokenFromLocalStorage = () => {
//   localStorage.removeItem("token");
// };

// if (token) {
//   saveTokenToLocalStorage(token);
// } else {
//   removeTokenFromLocalStorage();
// }

// // 토큰 갱신 인터셉터
// axios.interceptors.response.use(
//   (response) => {
//     // 응답 처리
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       console.log("401 에러 발생: 토큰 제거하지 않음");
//       alert("401 에러 발생");
//       // 401 에러 발생 시 토큰을 제거하는 로직 추가
//       removeTokenFromLocalStorage();
//       // 로그인 페이지로 리디렉션
//       const navigate = useNavigate();
//       navigate("/login");
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// const Root = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// ReactDOM.createRoot(document.getElementById("root")).render(<Root />);






// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import App from "./App";
// import "./index.scss";
// import axios from "axios";

// const token = localStorage.getItem("token");

// // 토큰을 저장하는 함수
// const saveTokenToLocalStorage = (token) => {
//   localStorage.setItem("token", token);
// };

// // 토큰을 제거하는 함수
// const removeTokenFromLocalStorage = () => {
//   localStorage.removeItem("token");
// };

// if (token) {
//   saveTokenToLocalStorage(token);
// } else {
//   removeTokenFromLocalStorage();
// }

// // 토큰 갱신 인터셉터
// axios.interceptors.response.use(
//   (response) => {
//     // 응답 처리
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       console.log("401 에러 발생: 토큰 제거하지 않음");
//       alert("401 에러 발생");
//       // 401 에러 발생 시 토큰을 제거하는 로직 추가
//       removeTokenFromLocalStorage();
//       // 로그인 페이지로 리디렉션
//       navigate("/login");
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// const Root = () => {
//   const navigate = useNavigate();

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={<App />}
//         />
//         <Route
//           path="/login"
//           element={<Login />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
















// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.scss";

// //import ReduxThunk from 'redux-thunk';
// // import thunk from 'redux-thunk';
// // import { createStore, applyMiddleware } from 'redux';
// // import reducer from '_reducers/user_reducer.tsx';

// //const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
// //const store = createStore(reducer, applyMiddleware(thunk));

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <App />
// );
