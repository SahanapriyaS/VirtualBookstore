// src/api/customerService.js
import api from "./axiosClient";
import { getEmailFromToken } from "../utils/auth";

/**
 * Try to resolve the current user's customerId.
 * 1) Use cached value if present.
 * 2) Try GET /api/customers and match by email (if allowed by backend).
 * 3) If forbidden (403/401), require manual entry (throw a sentinel error).
 */

const CUSTOMER_ID_REQUIRED = "CUSTOMER_ID_REQUIRED";

export const getMyCustomerId = async () => {
  // 1) Cached?
  const cached = localStorage.getItem("customerId");
  if (cached) return Number(cached);

  // 2) Try to derive from /api/customers (if security allows)
  try {
    const email = getEmailFromToken();
    if (!email) throw new Error("No email found in token. Please login again.");

    const res = await api.get("/api/customers");
    const me = (res.data || []).find(
      (c) => c.email && c.email.toLowerCase() === email.toLowerCase()
    );
    if (!me) throw new Error("Customer record not found for your email.");
    localStorage.setItem("customerId", String(me.id));
    return me.id;
  } catch (err) {
    // If backend forbids /api/customers for BUYER (403/401), require manual entry.
    const status = err?.response?.status;
    if (status === 403 || status === 401) {
      const e = new Error(CUSTOMER_ID_REQUIRED);
      e.code = CUSTOMER_ID_REQUIRED;
      throw e;
    }
    // Bubble other errors with a readable message
    throw err;
  }
};

/**
 * Allow user to set the customerId manually (one-time).
 */
export const setMyCustomerId = (id) => {
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) {
    throw new Error("Invalid customer ID. It must be a positive integer.");
  }
  localStorage.setItem("customerId", String(num));
  return num;
};

// Export the sentinel code so UI can detect the fallback flow
export const CUSTOMER_ID_REQUIRED_CODE = "CUSTOMER_ID_REQUIRED";