import { useEffect, useState } from "react";
import { getAllBooks } from "../api/bookService";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks()
      .then((res) => setBooks(res.data))
      .catch(() => alert("Unauthorized! Please login."));
  }, []);

  return (
    <div>
      <h2>Available Books</h2>

      {books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Price: ₹{book.price}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Books;