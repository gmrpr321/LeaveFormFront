import styles from "../StudentCardPage/StudentCardPage.module.css";
// dispData = {
//     date_from: attendance.date_from,
//     date_to: attendance.date_to,
//     section: attendance.section,
//     is_parent_consent: attendance.is_parent_consent,
//     is_staff_consent: attendance.is_staff_consent,
//     is_HOD_consent: attendance.is_HOD_consent,
//   }
export default function StudentCardPage(props) {
  const dispData = props.dispData;
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
          <p>Has Parent Consent?</p>
          <p>{dispData.is_parent_consent ? "Yes" : "No"}</p>
        </div>
        <div className={styles.cardItem}>
          <p>Has Staff Consent?</p>
          <p>{dispData.is_staff_consent ? "Yes" : "No"}</p>
        </div>
        <div className={styles.cardItem}>
          <p>Has Hod Consent?</p>
          <p>{dispData.is_hod_consent ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
}
