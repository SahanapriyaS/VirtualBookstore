import { logoutUser } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      {token ? (
        <>
          <Link to="/books">Books</Link> |{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
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