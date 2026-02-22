// src/utils/auth.js
import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token") || null;

export const getEmailFromToken = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const dec = jwtDecode(token);
    return dec.sub || null; // subject = email
  } catch {
    return null;
  }
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return localStorage.getItem("role"); // fallback
  try {
    const dec = jwtDecode(token);
    return dec.role || localStorage.getItem("role");
  } catch {
    return localStorage.getItem("role");
  }
};

export const isSeller = () => getUserRole() === "SELLER";
export const isBuyer  = () => getUserRole() === "BUYER";
export const isAdmin  = () => getUserRole() === "ADMIN";
