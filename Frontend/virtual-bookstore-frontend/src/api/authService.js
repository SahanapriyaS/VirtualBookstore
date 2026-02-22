import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/auth";

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });

  const token = typeof res.data === "string" ? res.data : res.data.token;
  localStorage.setItem("token", token);

  try {
    const dec = jwtDecode(token);
    if (dec.role) localStorage.setItem("role", dec.role);
    if (dec.sub)  localStorage.setItem("email", dec.sub);
  } catch {
  }

  return token;
};

export const registerUser = (userData, role) =>
  axios.post(`${API_URL}/signup/${role}`, userData);

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
  localStorage.removeItem("customerId"); 
};