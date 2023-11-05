import { useState } from "react";
import { MakeRequest } from "../makeRequest/MakeRequest";
import classes from "../CreateUserPage/CreateUser.module.css";
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
    if (formData.is_hod) {
      formData.is_staff = true;
    }
    if (formData.class_incharge_username === "")
      setFormData((prev) => {
        delete prev.class_incharge_username;
        return prev;
      });
    if (formData.mentor_username === "")
      setFormData((prev) => {
        delete prev.mentor_username;
        return prev;
      });
    if (formData.HOD_username === "")
      setFormData((prev) => {
        delete prev.HOD_username;
        return prev;
      });
    MakeRequest("http://127.0.0.1:8000/LeaveOD/CreateUser/", formData, "POST")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div className={classes.formContainer}>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit} className={classes.formElements}>
        <div>
          <label className={classes.formLabel}>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={classes.formInput}
            required
          />
        </div>
        <div>
          <label className={classes.formLabel}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={classes.formInput}
            required
          />
        </div>
        <div>
          <label className={classes.formLabel}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={classes.formInput}
            required
          />
        </div>

        <div>
          <label className={classes.formLabel}>Mentor Username</label>
          <input
            type="text"
            name="mentor_username"
            value={formData.mentor_username}
            onChange={handleChange}
            className={classes.formInput}
          />
        </div>
        <div>
          <label className={classes.formLabel}>Class Incharge Username</label>
          <input
            type="text"
            name="class_incharge_username"
            value={formData.class_incharge_username}
            onChange={handleChange}
            className={classes.formInput}
          />
        </div>
        <div>
          <label className={classes.formLabel}>HOD Username</label>
          <input
            type="text"
            name="HOD_username"
            value={formData.HOD_username}
            onChange={handleChange}
            className={classes.formInput}
          />
        </div>
        <div>
          <label className={classes.formLabel}>Date of Joining</label>
          <input
            type="date"
            name="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleChange}
            className={classes.formInput}
          />
        </div>
        <div>
          <div className={classes.labels}>
            <label className={classes.checkboxLabel}>
              Is Staff
              <input
                type="checkbox"
                name="is_staff"
                checked={formData.is_staff}
                onChange={handleChange}
              />
            </label>
            <label className={classes.checkboxLabel}>
              Is HOD
              <input
                type="checkbox"
                name="is_hod"
                checked={formData.is_hod}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <button type="submit" className={classes.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
