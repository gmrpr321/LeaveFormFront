import { useEffect, useState } from "react";
import { MakeRequest } from "../makeRequest/MakeRequest";
import StudentFormList from "../StudentFormList/StudentFormList";
import classes from "../StaffLandingPage/StaffLandingPage.module.css";
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
  const [refresh, setIsRefresh] = useState(false);
  function getStudentData(position) {
    const dateRange = getDateRange();
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
    console.log("refreshed");
    if (props.is_hod) {
      getStudentData("HOD");
    } else {
      getStudentData("class_Incharge");
      getStudentData("mentor");
    }
  }, [refresh]);
  function handleLogout() {
    MakeRequest("http://127.0.0.1:8000/LeaveOD/Logout/", {}, "GET").then(() => {
      props.changeIsLogin(false);
    });
  }
  return (
    <div className={classes.container}>
      <button onClick={() => handleLogout()} className={classes.logoutButton}>
        Logout
      </button>

      {props.is_hod && (
        <StudentFormList
          FormData={HODStudentData}
          is_hod={props.is_hod}
          is_staff={props.is_staff}
          className={classes.studentFormList}
          setIsRefresh={setIsRefresh}
        />
      )}
      {!props.is_hod && (
        <div className={classes.dataContainer}>
          {classInchargeStudentData.length !== 0 && (
            <div>
              <div className={classes.dataHeading}>
                <h2>Class Incharge Data</h2>
              </div>
              <StudentFormList
                FormData={classInchargeStudentData}
                is_hod={props.is_hod}
                is_staff={props.is_staff}
                className={classes.studentFormList}
                setIsRefresh={setIsRefresh}
              />
            </div>
          )}

          {mentorStudentData.length && (
            <div>
              <div className={classes.dataHeading}>
                <h2>Mentor Data</h2>
              </div>
              <StudentFormList
                FormData={mentorStudentData}
                is_hod={props.is_hod}
                is_staff={props.is_staff}
                className={classes.studentFormList}
                setIsRefresh={setIsRefresh}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
