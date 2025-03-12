import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login1({ setEmail, setChallenge }) {
  
    const [inputEmail, setInputEmail] = useState("");
    const navigate = useNavigate(); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
       console.log("Entered email:", inputEmail);
  
      try {
        const response = await axios.post("http://127.0.0.1:5000/request-challenge", { email: inputEmail });
  
         console.log("Challenge:", response.data.challenge);
  
        navigate("/login/step2", { state: { email: inputEmail, challenge: response.data.challenge } });
  
      } catch (error) {
        console.error("Request failed:", error);
      }
    };
  

  return (
    <div style={{
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
      padding: "20px"
    }}>
      <h1 style={{ color: '#0a2540' }}>Login: Step 1</h1>

      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "-4%",
      }}>
        <p>Your email address</p>
        <input 
          type="email" 
          value={inputEmail} 
          style={{
            width: "350px",
            height: "25px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: "15px",
          }} 
          onChange={(e) => setInputEmail(e.target.value)} 
          required 
        />
        <button type="submit" style={{
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
        }}>
          Next Step
        </button>
      </form>
    </div>
  );
}

export default Login1;

