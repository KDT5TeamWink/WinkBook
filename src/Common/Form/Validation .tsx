// 이메일 체크 여부 
const emailExp = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

export const emailCheck = (mail:string) =>{
    return emailExp.test(mail) ? true : false;
}


//패스워드 체크 여부
// const PwExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}/;


const PwExp = /^.{8,}$/;
  export const PwCheck = (password:string) => {
    return PwExp.test(password) ? true : false;
}