import React from "react";

function StudentFormList({ FormData }) {
  console.log(FormData);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Year of Study</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Section</th>
            <th>Student Name</th>
            <th>Student Department</th>
            <th>Parent Phone Number</th>
            <th>Attendance Status</th>
            <th>Parent Consent</th>
            <th>Staff Consent</th>
            <th>HOD Consent</th>
          </tr>
        </thead>
        <tbody>
          {FormData.map((attendance, index) => (
            <tr key={index}>
              <td>{attendance.student}</td>
              <td>{attendance.year_of_study}</td>
              <td>{attendance.date_from}</td>
              <td>{attendance.date_to}</td>
              <td>{attendance.section}</td>
              <td>{attendance.student_name}</td>
              <td>{attendance.student_dept}</td>
              <td>{attendance.parent_ph_no}</td>
              <td>{attendance.attendance_status}</td>
              <td>{attendance.is_parent_consent ? "Yes" : "No"}</td>
              <td>{attendance.is_staff_consent ? "Yes" : "No"}</td>
              <td>{attendance.is_HOD_consent ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentFormList;
