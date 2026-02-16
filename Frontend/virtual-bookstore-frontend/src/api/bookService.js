import api from "./axiosClient";

export const getAllBooks = () => {
  return api.get("/api/books");
};