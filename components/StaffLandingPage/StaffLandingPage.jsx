import { useEffect, useState } from "react";
import { MakeRequest } from "../makeRequest/MakeRequest";
import StudentFormList from "../StudentFormList/StudentFormList";
// props {is_staff,is_hod,username}

function getDateRange() {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    day_from: formatDate(oneMonthAgo),
    day_to: formatDate(today),
  };
}
export default function StaffLandingPage(props) {
  const [mentorStudentData, setMentorStudentData] = useState([]);
  const [classInchargeStudentData, setclassInchargeStudentData] = useState([]);
  const [HODStudentData, setHODStudentData] = useState([]);
  function getStudentData(position) {
    const dateRange = getDateRange();
    console.log(dateRange)
    if (position === "class_incharge") {
      MakeRequest(
        "http://127.0.0.1:8000/LeaveOD/RetriveStudentFormsForClassIncharge/" +
          props.username +
          "/" +
          dateRange.day_from +
          "/" +
          dateRange.day_to +
          "/",
        {},
        "GET"
      )
        .then((data) => {
          console.log(data);
          setclassInchargeStudentData(data);
        })
        .catch((error) => console.log(error));
    } else if (position === "mentor") {
      MakeRequest(
        "http://127.0.0.1:8000/LeaveOD/RetriveStudentFormsForMentor/" +
          props.username +
          "/" +
          dateRange.day_from +
          "/" +
          dateRange.day_to +
          "/",
        {},
        "GET"
      )
        .then((data) => {
          console.log(data);
          setMentorStudentData(data);
        })
        .catch((error) => console.log(error));
    } else if (position === "HOD") {
      MakeRequest(
        "http://127.0.0.1:8000/LeaveOD/RetriveStudentFormsForHOD/" +
          props.username +
          "/" +
          dateRange.day_from +
          "/" +
          dateRange.day_to +
          "/",
        {},
        "GET"
      )
        .then((data) => {
          console.log(data);
          setHODStudentData(data);
        })
        .catch((error) => console.log(error));
    }
  }
  useEffect(() => {
    if (props.is_hod) {
      getStudentData("HOD");
    } else {
      getStudentData("class_Incharge");
      getStudentData("mentor");
    }
  }, []);
  function handleLogout() {
    MakeRequest("http://127.0.0.1:8000/LeaveOD/Logout/", {}, "GET").then(() => {
      props.changeIsLogin(false);
    });
  }
  return (
    <div>
      <button onClick={() => handleLogout()}>Logout</button>

      {props.is_hod && (
        <StudentFormList FormData={HODStudentData}></StudentFormList>
      )}
      {!props.is_hod && (
        <div>
          Class Incharge Data
          <StudentFormList
            FormData={classInchargeStudentData}
          ></StudentFormList>
          Mentor Data
          <StudentFormList FormData={mentorStudentData}></StudentFormList>
        </div>
      )}
    </div>
  );
}
