import React, { useEffect, useState } from "react";
import StudentCardPage from "../StudentCardPage/StudentCardPage";
import StaffCardPage from "../StaffCardPage/StaffCardPage";
import HodCardPage from "../HodCardPage/HodCardPage";
import classes from "../StudentFormList/StudentFormList.module.css";
function StudentFormList(props) {
  const [showDetails, SetShowDetails] = useState(0);
  //1 - student , 2- class Incharge/Mentor, 3- HoD
  const [dispData, setDispData] = useState({});
  const [isBack, setIsBack] = useState(false);
  useEffect(() => {
    props.setIsRefresh((prev) => !prev);
  }, [isBack]);
  // let dispData = {};
  //object for card page
  const FormData = props.FormData;
  console.log(FormData, props);
  return (
    <div className={classes.container}>
      {/* {student} */}
      {!props.is_staff && !props.is_hod && showDetails === 0 && (
        <div className={classes.studentContainer}>
          <table className={classes.dataTable}>
            <thead>
              <tr>
                <th>Date From</th>
                <th>Date To</th>
                <th>Parent Consent</th>
                <th>Staff Consent</th>
                <th>HOD Consent</th>
              </tr>
            </thead>
            <tbody>
              {FormData.map((attendance, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    setDispData({
                      id: attendance.id,
                      date_from: attendance.date_from,
                      date_to: attendance.date_to,
                      section: attendance.section,
                      is_parent_consent: attendance.is_parent_consent,
                      is_staff_consent: attendance.is_staff_consent,
                      is_HOD_consent: attendance.is_HOD_consent,
                    });
                    SetShowDetails(1);
                    setIsBack(false);
                  }}
                  className={classes.dataRow}
                >
                  <td>{attendance.date_from}</td>
                  <td>{attendance.date_to}</td>
                  <td>{attendance.is_parent_consent ? "Yes" : "No"}</td>
                  <td>{attendance.is_staff_consent ? "Yes" : "No"}</td>
                  <td>{attendance.is_HOD_consent ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* class incharge/mentor/HOD */}
      {(props.is_staff || props.is_hod) && showDetails === 0 && (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Department</th>
              <th>Year of Study</th>
              <th>Section</th>
              <th>Parent Phone Number</th>
              <th>Attendance Status</th>
              <th>Parent Consent</th>
              <th>Staff Consent</th>
              <th>HOD Consent</th>
            </tr>
          </thead>
          <tbody>
            {FormData.map((attendance, index) => (
              <tr
                key={index}
                onClick={() => {
                  setDispData({
                    id: attendance.id,
                    student_name: attendance.student_name,
                    student_dept: attendance.student_dept,
                    year_of_study: attendance.year_of_study,
                    section: attendance.section,
                    date_from: attendance.date_from,
                    date_to: attendance.date_to,
                    parent_ph_no: attendance.parent_ph_no,
                    is_parent_consent: attendance.is_parent_consent,
                    is_staff_consent: attendance.is_staff_consent,
                    is_HOD_consent: attendance.is_HOD_consent,
                  });
                  if (!props.is_hod) SetShowDetails(2);
                  else SetShowDetails(3);
                  setIsBack(false);
                }}
                className={classes.dataRow}
              >
                <td>{attendance.student_name}</td>
                <td>{attendance.student_dept}</td>
                <td>{attendance.year_of_study}</td>
                <td>{attendance.section}</td>
                <td>{attendance.parent_ph_no}</td>
                <td>{attendance.attendance_status}</td>
                <td>{attendance.is_parent_consent ? "Yes" : "No"}</td>
                <td>{attendance.is_staff_consent ? "Yes" : "No"}</td>
                <td>{attendance.is_HOD_consent ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showDetails === 1 && !isBack && (
        <StudentCardPage
          dispData={dispData}
          isBack={isBack}
          setIsBack={setIsBack}
          setShowDetails={SetShowDetails}
        ></StudentCardPage>
      )}
      {showDetails === 2 && !isBack && (
        <StaffCardPage
          dispData={dispData}
          isBack={isBack}
          setIsBack={setIsBack}
          setShowDetails={SetShowDetails}
        ></StaffCardPage>
      )}
      {showDetails === 3 && !isBack && (
        <HodCardPage
          dispData={dispData}
          isBack={isBack}
          setIsBack={setIsBack}
          setShowDetails={SetShowDetails}
        ></HodCardPage>
      )}
    </div>
  );
}

export default StudentFormList;
