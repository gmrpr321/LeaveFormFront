import { MakeRequest } from "../components/makeRequest/MakeRequest";
import LoginPage from "../components/loginPage/LoginPage";
import CreateUser from "../components/CreateUserPage/CreateUser";
import CreateLeaveForm from "../components/CreateLeaveForm/CreateLeaveForm";
import { useState } from "react";
import classes from "../public/styles/Index.module.css";
console.log(MakeRequest);
export default function Index(props) {
  const [isLogin, setIsLogin] = useState(false);
  function changeIsLogin(value) {
    setIsLogin(value);
  }
  return (
    <div className={classes.container}>
      {!isLogin && <CreateUser></CreateUser>}
      <LoginPage changeIsLogin={changeIsLogin} isLogin={isLogin}></LoginPage>
    </div>
  );
}
