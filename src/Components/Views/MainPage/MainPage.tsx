import "./MainPage.scss";
import Carousel from "./Component/Carousel";
import ajax from "src/Apis/adminAuth";
import Main from "./Component/Main";
import Recommand from "./Component/Recommand";

const params = new URLSearchParams(location.search);
console.log(params.get("code"));
async function auth() {
  try {
    const res = await ajax.get("/products");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
if (params.get("code")) {
  auth();
}

export default function MainPage() {
  return (
    <>
      <Carousel />
      <Recommand />
      <Main />
    </>
  );
}
