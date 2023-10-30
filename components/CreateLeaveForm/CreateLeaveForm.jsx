import React, { useState } from "react";
import { MakeRequest } from "../makeRequest/MakeRequest";
function CreateLeaveForm(props) {
  const [formData, setFormData] = useState({
    student_name: "",
    student: props.username,
    year_of_study: 1,
    date_from: "",
    date_to: "",
    section: "",
    student_dept: "",
    parent_ph_no: "",
    attendance_status: "LEAVE",
    is_parent_consent: false,
    is_staff_consent: false,
    is_HOD_consent: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    MakeRequest(
      "http://127.0.0.1:8000/LeaveOD/StudentCreateForm/",
      formData,
      "POST"
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div>
      <h1>Leave Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name:</label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Year of Study:</label>
          <input
            type="number"
            name="year_of_study"
            value={formData.year_of_study}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date From:</label>
          <input
            type="date"
            name="date_from"
            value={formData.date_from}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date To:</label>
          <input
            type="date"
            name="date_to"
            value={formData.date_to}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Section:</label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Student Department:</label>
          <input
            type="text"
            name="student_dept"
            value={formData.student_dept}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Parent Phone Number:</label>
          <input
            type="text"
            name="parent_ph_no"
            value={formData.parent_ph_no}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Attendance Status:</label>
          <select
            name="attendance_status"
            value={formData.attendance_status}
            onChange={handleChange}
          >
            <option value="LEAVE">Leave</option>
            <option value="ON DUTY">On Duty</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateLeaveForm;
