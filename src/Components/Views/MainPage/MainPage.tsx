import "./MainPage.scss";
import Carousel from "./Component/Carousel";
import ajax from "@/Apis/adminAuth";
import Main from "./Component/Main";
import Recommand from "./Component/Recommand";
import { useEffect } from "react";
import axios from "axios";

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
    <div className="wrapper">
      <Carousel />
      <Recommand />
      <Main />
    </div>
  );
}