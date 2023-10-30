import { MakeRequest } from "../makeRequest/MakeRequest";
import CreateLeaveForm from "../CreateLeaveForm/CreateLeaveForm";
import { useState } from "react";
import StudentFormList from "../StudentFormList/StudentFormList";
export default function StudentLandingPage(props) {
  const [data, setData] = useState([]);
  function getLeaveFormData() {
    MakeRequest(
      "http://127.0.0.1:8000/LeaveOD/RetriveStudentFormsById/" +
        props.username +
        "/",
      {},
      "GET"
    )
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.log(error));
  }
  function handleLogout() {
    MakeRequest("http://127.0.0.1:8000/LeaveOD/Logout/", {}, "GET").then(() => {
      props.changeIsLogin(false);
    });
  }
  return (
    <div>
      <button onClick={() => handleLogout()}>Logout</button>
      <CreateLeaveForm username={props.username}></CreateLeaveForm>;
      <button onClick={getLeaveFormData}>CLick to get Student Form Data</button>
      {data.length > 0 && <StudentFormList FormData={data}></StudentFormList>}
    </div>
  );
}
