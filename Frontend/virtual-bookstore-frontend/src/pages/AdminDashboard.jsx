import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { isAdmin } from "../utils/auth";
import { Navigate } from "react-router-dom";

function AdminDashboard() {
  if (!isAdmin()) return <Navigate to="/books" />;

  const [books, setBooks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get("/api/books").then(res => setBooks(res.data));
    api.get("/api/customers").then(res => setCustomers(res.data));
    api.get("/api/transactions").then(res => setTransactions(res.data));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Books</h2>
      {books.map(b => <p>{b.title}</p>)}

      <h2>Customers</h2>
      {customers.map(c => <p>{c.name} ({c.email})</p>)}

      <h2>Transactions</h2>
      {transactions.map(t => <p>{t.bookTitle} → {t.customerName}</p>)}
    </div>
  );
}

export default AdminDashboard;