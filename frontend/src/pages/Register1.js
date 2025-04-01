import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register1() {
  const [inputEmail, setInputEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputEmail) {
      console.error("Email is empty!");
      return;
    }
  
    console.log("Navigating with email:", inputEmail);
    localStorage.setItem("email", inputEmail);
    navigate("/register/step2", { state: { email: inputEmail } });
  };
  

  const mainDivStyle = {
    height: "250px",
    width: "500px",
    border: "solid black 2px",
    borderRadius: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "3% auto",
    textAlign: "center",
    padding: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#0a2540",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    width: "100px",
    height: "35px",
    color: "#fff",
    marginTop: "10px",
    cursor: "pointer",
    textDecoration: "none",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-4%",
  };

  const inputStyle = {
    width: "350px",
    height: "25px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
  };

  return (
    <div style={mainDivStyle}>
      <h1 style={{ color: "#0a2540" }}>Registration: Step 1</h1>

      <form style={formStyle} onSubmit={handleSubmit}>
        <p>Your email address</p>
        <input
          type="email"
          name="email"
          style={inputStyle}
          onChange={(e) => setInputEmail(e.target.value)}
          required
        />
        <button type="submit" style={buttonStyle}>
          Next Step
        </button>
      </form>
    </div>
  );
}

export default Register1;
