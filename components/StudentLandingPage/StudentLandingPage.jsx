import { MakeRequest } from "../makeRequest/MakeRequest";
import CreateLeaveForm from "../CreateLeaveForm/CreateLeaveForm";
import { useEffect, useState } from "react";
import StudentFormList from "../StudentFormList/StudentFormList";
export default function StudentLandingPage(props) {
  const [refresh, setIsRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [isShowForms, setIsShowForms] = useState(false);
  useEffect(() => {
    getLeaveFormData();
  }, [refresh]);
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
  console.log(data);
  return (
    <div>
      <button onClick={() => handleLogout()}>Logout</button>
      <button
        onClick={() => {
          getLeaveFormData();
          setIsShowForms(true);
          console.log("yes");
        }}
      >
        CLick to get Student Form Data
      </button>
      {!isShowForms && (
        <CreateLeaveForm username={props.username}></CreateLeaveForm>
      )}
      {data.length > 0 && isShowForms && (
        <div>
          <button onClick={setIsShowForms.bind(self, false)}>back</button>
          <StudentFormList
            FormData={data}
            setIsRefresh={setIsRefresh}
            is_staff={false}
          ></StudentFormList>
        </div>
      )}
    </div>
  );
}
