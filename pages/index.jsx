import { MakeRequest } from "../components/makeRequest/MakeRequest";
import LoginPage from "../components/loginPage/LoginPage";
import CreateUser from "../components/CreateUserPage/CreateUser";
import CreateLeaveForm from "../components/CreateLeaveForm/CreateLeaveForm";
import { useState } from "react";
console.log(MakeRequest);
export default function Index(props) {
  const [isLogin, setIsLogin] = useState(false);
  function changeIsLogin(value) {
    setIsLogin(value);
  }
  return (
    <div>
      <LoginPage changeIsLogin={changeIsLogin} isLogin={isLogin}></LoginPage>;
      {!isLogin && <CreateUser></CreateUser>};
    </div>
  );
}
