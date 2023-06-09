const headers = {
  'Content-Type': 'application/json',
  'apikey': "KDT5_nREmPe9B",
  'username': "KDT5_TeamWink",
}

const options = (method: string, param:object , tokenparam?:string ): RequestInit => {
const updateHeader = tokenparam ? {...headers, 'Authorization': 'Bearer '+ tokenparam} : headers;
  return {
    method,
    headers: updateHeader,
    body: JSON.stringify(param)
  }
}

 const mainURL = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth";
  
  export const JoinForm = async (email:string,displayName:string,password:string) => {
    const URL = `${mainURL}/signup`;
    const res = await fetch(URL,options("POST", {email,displayName,password}));
    const param = await res.json();
    return param;
  };

  //const LOGINURL = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login";

  export const LoginForm = async (email:string,password:string) => {
    const LOGINURL = `${mainURL}/login`
    const res = await fetch(LOGINURL,options("POST", {email,password}));
    const param = await res.json();
    return param;
  };

  //const LogoutURL = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout";

  export const LogoutForm = async () => {
    const LOGOUTURL = `${mainURL}/logout`
    const token:string = localStorage.getItem("token") as string;
    const res = await fetch(LOGOUTURL,options("POST",{} , token));
    const param = await res.json();
    return param;  
  };