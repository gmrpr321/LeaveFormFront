import classes from "./LoginPage.module.css";
import { useState } from "react";
import { MakeRequest } from "../makeRequest/MakeRequest";
import StudentLandingPage from "../StudentLandingPage/StudentLandingPage";
import StaffLandingPage from "../StaffLandingPage/StaffLandingPage";
export default function LoginPage(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isReturned, setIsReturned] = useState(0);
  const [isHod, setIsHod] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    if (username != "" && password != "") {
      const payload = { username: username, password: password };
      MakeRequest("http://127.0.0.1:8000/LeaveOD/Login/", payload, "POST")
        .then((data) => {
          console.log(data);
          setPassword("");
          setIsHod(data.is_hod);
          setIsStaff(data.is_staff);
          if (!data.is_staff) setIsReturned(1);
          else setIsReturned(-1);
          props.changeIsLogin(true);
        })
        .catch((error) => console.log(error));
    }
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleUserNameChange(event) {
    setUserName(event.target.value);
  }
  return (
    <div>
      {!props.isLogin && (
        <div className={classes.loginContainer}>
          <h1>Login User</h1>
          <input
            type="text"
            className={classes.inputField}
            onChange={handleUserNameChange}
          />
          <input
            type="password"
            className={classes.inputField}
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className={classes.submitButton}
          >
            Submit
          </button>
        </div>
      )}
      {isReturned === 1 && props.isLogin && (
        <StudentLandingPage
          username={username}
          changeIsLogin={props.changeIsLogin}
          className={classes.landingPage}
        />
      )}
      {isReturned === -1 && props.isLogin && (
        <StaffLandingPage
          is_hod={isHod}
          is_staff={isStaff}
          username={username}
          changeIsLogin={props.changeIsLogin}
          className={classes.landingPage}
        />
      )}
    </div>
  );
}
