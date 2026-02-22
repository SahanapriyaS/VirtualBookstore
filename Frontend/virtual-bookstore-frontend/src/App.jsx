import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/Books";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import BuyBook from "./pages/BuyBook";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />
        <Route path="/add-book" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        <Route path="/edit-book/:id" element={<ProtectedRoute><UpdateBook /></ProtectedRoute>} />
        <Route path="/buy" element={<ProtectedRoute><BuyBook /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;