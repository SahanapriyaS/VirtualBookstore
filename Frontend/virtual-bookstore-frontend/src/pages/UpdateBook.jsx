import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { isSeller } from "../utils/auth";
import { Navigate, useParams } from "react-router-dom";

function UpdateBook() {
  if (!isSeller()) return <Navigate to="/books" />;

  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    api.get(`/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(() => alert("Book not found"));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put("/api/books", book);
      alert("Book updated!");
    } catch {
      alert("Update failed!");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Book</h2>

      <input value={book.title} onChange={(e)=>setBook({...book,title:e.target.value})} /><br /><br />
      <input value={book.author} onChange={(e)=>setBook({...book,author:e.target.value})} /><br /><br />
      <input value={book.price} onChange={(e)=>setBook({...book,price:e.target.value})} /><br /><br />
      <input value={book.stock} onChange={(e)=>setBook({...book,stock:e.target.value})} /><br /><br />
      <textarea value={book.description} onChange={(e)=>setBook({...book,description:e.target.value})}></textarea>

      <br /><br />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateBook;