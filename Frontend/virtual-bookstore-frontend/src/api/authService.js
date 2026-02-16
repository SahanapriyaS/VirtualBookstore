import axios from "axios";

const API_URL = "http://localhost:8080/auth";


export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  const token = response.data; 

  localStorage.setItem("token", token);
  return token;
};


export const registerUser = async (userData, role) => {
  return axios.post(`${API_URL}/signup/${role}`, userData);
};


export const logoutUser = () => {
  localStorage.removeItem("token");
};