// Write axios for all API endpoints
import axiosInstance from "./axiosInterceptorInstance";
const data = {
  username: "desadwf",
  password: "12345678",
  date_of_joining: "2003-08-02",
  is_staff: false,
  is_hod: true,
};
function getCookie(name: string) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
import axios from "axios"; // Make sure you import axios

export const MakeRequest = (url: string, data: object, method: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const csrftoken = getCookie("csrftoken");
      axios.defaults.headers.common["X-CSRFToken"] = csrftoken;
      if (method === "GET") {
        const response = await axios.get(url);
        resolve(response.data);
      } else if (method === "POST") {
        const response = await axios.post(url, data);
        resolve(response.data);
      } else {
        resolve(null);
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
