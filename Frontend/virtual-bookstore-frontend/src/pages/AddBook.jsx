
import { useState } from "react";
import api from "../api/axiosClient";
import { isSeller } from "../utils/auth";
import { Navigate } from "react-router-dom";

function AddBook() {
  
  if (!isSeller()) return <Navigate to="/books" />;

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "FICTION",
    price: "",
    stock: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  const isValid =
    form.title.trim() &&
    form.author.trim() &&
    form.category &&
    form.price !== "" &&
    !isNaN(Number(form.price)) &&
    Number(form.price) > 0 &&
    form.stock !== "" &&
    Number.isInteger(Number(form.stock)) &&
    Number(form.stock) >= 0;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!isValid) {
      alert("Please fill all fields correctly (price > 0, stock >= 0).");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      await api.post("/api/books", payload);
      alert("Book Added!");
      // reset form
      setForm({
        title: "",
        author: "",
        category: "FICTION",
        price: "",
        stock: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data ||
        err?.message ||
        "Failed to add book! Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <h2>Add New Book</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
      />
      <br />
      <br />

      <label>Category:&nbsp;</label>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        
        <option value="FICTION">FICTION</option>
        <option value="PROGRAMMING">PROGRAMMING</option>
        <option value="DEVOPS">DEVOPS</option>
        <option value="DATA_SCIENCE">DATA_SCIENCE</option>
        <option value="COMICS">COMICS</option>
        <option value="MANGA">MANGA</option>
        <option value="BUSINESS_FINANCE">BUSINESS_FINANCE</option>
        <option value="SELF_IMPROVEMENT">SELF_IMPROVEMENT</option>
        <option value="HEALTH_FITNESS">HEALTH_FITNESS</option>
        <option value="COOKING">COOKING</option>
        <option value="TRAVEL">TRAVEL</option>
        <option value="KIDS">KIDS</option>
        <option value="YOUNG_ADULT">YOUNG_ADULT</option>
        <option value="RELIGION_SPIRITUAL">RELIGION_SPIRITUAL</option>
        <option value="ART_DESIGN">ART_DESIGN</option>
        <option value="ACADEMIC">ACADEMIC</option>
        <option value="COMPETITIVE_EXAMS">COMPETITIVE_EXAMS</option>
        <option value="CLOUD_COMPUTING">CLOUD_COMPUTING</option>
        <option value="ENTREPRENEURSHIP">ENTREPRENEURSHIP</option>
      </select>

      <br />
      <br />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        inputMode="decimal"
      />
      <br />
      <br />

      <input
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        inputMode="numeric"
      />
      <br />
      <br />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows={4}
      />
      <br />
      <br />

      <button type="submit" disabled={loading || !isValid}>
        {loading ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
}

export default AddBook;