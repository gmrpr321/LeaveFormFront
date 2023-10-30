import { useState } from "react";
import { MakeRequest } from "../makeRequest/MakeRequest";
export default function CreateUser(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    date_of_joining: "",
    is_staff: false,
    is_hod: false,
    mentor_username: null,
    class_incharge_username: null,
    HOD_username: null,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    MakeRequest("http://127.0.0.1:8000/LeaveOD/CreateUser/", formData, "POST")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Joining:</label>
          <input
            type="date"
            name="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Is Staff:</label>
          <input
            type="checkbox"
            name="is_staff"
            checked={formData.is_staff}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Is HOD:</label>
          <input
            type="checkbox"
            name="is_hod"
            checked={formData.is_hod}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mentor Username:</label>
          <input
            type="text"
            name="mentor_username"
            value={formData.mentor_username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Class Incharge Username:</label>
          <input
            type="text"
            name="class_incharge_username"
            value={formData.class_incharge_username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>HOD Username:</label>
          <input
            type="text"
            name="HOD_username"
            value={formData.HOD_username}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
