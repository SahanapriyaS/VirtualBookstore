// src/pages/BuyBook.jsx
import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { isBuyer } from "../utils/auth";
import {
  getMyCustomerId,
  setMyCustomerId,
  CUSTOMER_ID_REQUIRED_CODE,
} from "../api/customerService";
import { Navigate } from "react-router-dom";

function BuyBook() {
  // Only BUYER can access
  if (!isBuyer()) return <Navigate to="/books" />;

  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState({ bookId: "", type: "BUY" });
  const [loading, setLoading] = useState(false);

  // Manual customerId fallback UI
  const [needsCustomerId, setNeedsCustomerId] = useState(false);
  const [manualCustomerId, setManualCustomerId] = useState("");

  useEffect(() => {
    api
      .get("/api/books")
      .then((res) => setBooks(res.data))
      .catch(() => alert("Failed to load books."));
  }, []);

  const handleSaveCustomerId = () => {
    try {
      const saved = setMyCustomerId(manualCustomerId);
      setNeedsCustomerId(false);
      alert(`Customer ID saved (${saved}). You can submit now.`);
    } catch (e) {
      alert(e.message || "Invalid customer ID.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!selected.bookId) {
      alert("Please select a book.");
      return;
    }

    try {
      setLoading(true);

      let customerId;
      try {
        // Try to resolve (cached or via /api/customers if allowed)
        customerId = await getMyCustomerId();
      } catch (err) {
        if (err?.code === CUSTOMER_ID_REQUIRED_CODE) {
          // Backend forbids /api/customers for this role; show manual input UI
          setNeedsCustomerId(true);
          setLoading(false);
          return;
        }
        throw err; // other errors bubble up
      }

      await api.post("/api/transactions", {
        customerId,
        bookId: Number(selected.bookId),
        type: selected.type, // BUY or BORROW
      });
      alert("Success!");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data || err?.message || "Transaction failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Buy / Borrow Book</h2>

        <select
          value={selected.bookId}
          onChange={(e) =>
            setSelected((s) => ({ ...s, bookId: e.target.value }))
          }
        >
          <option value="">Select Book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Transaction Type:&nbsp;</label>
        <select
          value={selected.type}
          onChange={(e) =>
            setSelected((s) => ({ ...s, type: e.target.value }))
          }
        >
          <option value="BUY">BUY</option>
          <option value="BORROW">BORROW</option>
        </select>

        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {needsCustomerId && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #999" }}>
          <h4>Enter your Customer ID (one-time)</h4>
          <p style={{ margin: "8px 0" }}>
            Your backend doesn’t allow BUYER to read <code>/api/customers</code>.
            Please enter your numeric Customer ID once. We'll store it locally.
          </p>
          <input
            placeholder="e.g., 12"
            value={manualCustomerId}
            onChange={(e) => setManualCustomerId(e.target.value)}
          />
          <button style={{ marginLeft: 8 }} onClick={handleSaveCustomerId}>
            Save ID
          </button>
        </div>
      )}
    </div>
  );
}

export default BuyBook;