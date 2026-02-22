import { logoutUser } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";
import { isAdmin, isBuyer, isSeller } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/">Home</Link> |{" "}

      
      {token && <Link to="/books">Books</Link>}{" "}

     
      {isSeller() && <>| <Link to="/add-book">Add Book</Link></>}

     
      {isBuyer() && <>| <Link to="/buy">Buy/Borrow</Link></>}

     
      {isAdmin() && <>| <Link to="/admin">Admin Dashboard</Link></>}

      {" | "}

      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;