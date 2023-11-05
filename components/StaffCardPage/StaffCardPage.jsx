// dispData = {
//     student_name: attendance.student_name,
//     student_dept: attendance.student_dept,
//     year_of_study: attendance.year_of_study,
//     section: attendance.section,
//     date_from: attendance.date_from,
//     date_to: attendance.date_to,
//     parent_ph_no: attendance.parent_ph_no,
//     is_parent_consent: attendance.is_parent_consent,
//     is_staff_consent: attendance.is_staff_consent,
//     is_HOD_consent: attendance.is_HOD_consent,

// payload:{
//     form_id : string,
//     position : string enum{'class_Incharge','HoD','mentor'}
//     is_parent_validate : bool
//     is_staff_validate : bool
//     }
import { useState } from "react";
import { MakeRequest } from "../makeRequest/MakeRequest";
import styles from "../StaffCardPage/StaffCardPage.module.css";
//   };
export default function StaffCardPage(props) {
  const dispData = props.dispData;
  console.log(dispData);
  const [parentConsent, setParentConsent] = useState(
    dispData.is_parent_consent
  );
  const [staffConsent, setStaffConsent] = useState(dispData.is_staff_consent);
  console.log(staffConsent, parentConsent);
  function sendRequest() {
    console.log({
      id: dispData.id,
      position: "mentor",
      is_parent_validate: parentConsent,
      is_staff_validate: staffConsent,
    });
    MakeRequest(
      "http://127.0.0.1:8000/LeaveOD/ValidateForm/",
      {
        id: dispData.id,
        position: "mentor",
        is_parent_validate: parentConsent,
        is_staff_validate: staffConsent,
      },
      "POST"
    )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => {
          props.setIsBack(true);
          props.setShowDetails(0);
        }}
      >
        Back
      </button>
      <div className={styles.card}>
        <div className={styles.cardItem}>
          <p>Student Name</p>
          <p>{dispData.student_name}</p>
        </div>
        <div className={styles.cardItem}>
          <p>Student Department</p>
          <p>{dispData.student_dept}</p>
        </div>
        <div className={styles.cardItem}>
          <p>Year of Study</p>
          <p>{dispData.year_of_study}</p>
        </div>
        <div className={styles.cardItem}>
          <p>Date From</p>
          <p>{dispData.date_from}</p>
        </div>
        <div className={styles.cardItem}>
          <p>Date To</p>
          <p>{dispData.date_to}</p>
        </div>
        <div className={styles.cardItem}>
          <p>Section</p>
          <p>{dispData.section}</p>
        </div>
        <div className={styles.cardItem}>
          <p>Parent Consent</p>
          <button
            onClick={() => setParentConsent((prev) => !prev)}
            className={styles.consentButton}
          >
            {parentConsent ? "Yes" : "No"}
          </button>
        </div>
        <div className={styles.cardItem}>
          <p>Staff Consent</p>
          <button
            onClick={() => setStaffConsent((prev) => !prev)}
            className={styles.consentButton}
          >
            {staffConsent ? "Yes" : "No"}
          </button>
        </div>
        <div className={styles.cardItem}>
          <p>Hod Consent</p>
          <p>{!dispData.is_HOD_consent && "No"}</p>
          <p>{dispData.is_HOD_consent && "Yes"}</p>
        </div>
        <div className={styles.cardItem}>
          <button onClick={sendRequest} className={styles.submitButton}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
