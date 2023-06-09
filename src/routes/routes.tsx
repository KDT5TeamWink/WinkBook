import Header from 'Common/Layout/Header/header'
import Footer from 'Common/Layout/Footer/footer'
import MainPage from 'Components/Views/MainPage/mainPage'
import Join from 'Common/Form/Signin/join'
import Login from 'Common/Form/Login/login'
import CartPage from 'Components/Views/CartPage/CartPage'
import MyPage from 'Components/Views/MyPage/MyPage'
import PrivatePage from './privateRoute'
import DetailPage from 'Components/Views/DetailPage/DetailPage'

import { Routes,  BrowserRouter, Route, Outlet } from 'react-router-dom'

 const Layout = () => {
  return(
    <>
    <Header/>
      <Outlet />
    <Footer/>
    </>
  )
}

function RoutesPage() {

  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/detailPage" element={<DetailPage />} />
        <Route path="/cart" element={
          <PrivatePage component={<CartPage />} status={""}/>}/>
        <Route path="/mypage" element={
          <PrivatePage component={<MyPage />} status={""}/>}
        />
        

        

        {/* <Route path="/mypage" element={<MyPage/>}/> */}
        </Route>     
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default RoutesPage