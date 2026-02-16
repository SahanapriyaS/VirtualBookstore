import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    password: "",
  });

  const [role, setRole] = useState("BUYER");

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData, role);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Signup failed!");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <br /><br />

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br /><br />

      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <br /><br />

      <input name="city" placeholder="City" onChange={handleChange} />
      <br /><br />

      <input name="address" placeholder="Address" onChange={handleChange} />
      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br /><br />

      <label>Select Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="BUYER">Buyer</option>
        <option value="SELLER">Seller</option>
        <option value="ADMIN">Admin</option>
      </select>

      <br /><br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Signup;