import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {GenerateKeysFromFace} from "../services/GenerateKeysFromFace.js"; 

function Register2() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const responseStatus = queryParams.get("success");
  const publicKey = location.state?.publicKey;

  const storedEmail = localStorage.getItem("email");
  const { email } = location.state || {};

  if (!email) {
    console.log("Email is missing in Register2");
  }else{
    console.log("email in register2" + email)
  }
  const handleRegister = async () => {
    try {
        const response = await fetch("http://localhost:5000/register_data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, publicKey })  
        });

        const data = await response.json();
        console.log("Backend Response:", data);

        if (response.ok) {
            alert("Registration successful!");
        } else {
            console.error("Registration failed:", data.error);
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Request failed:", error);
        alert("Error sending data to server.");
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
      <h1 style={{ color: '#0a2540' }}>Register: Step 2</h1>

      <p>Please scan your face using the camera</p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <p style={{ color: responseStatus ? 'green' : 'red' }}>
          {responseStatus ? 'Face scanned successfully!' : 'You need to scan your face'}
        </p>
        <button onClick={() => navigate("/face-scan?source=register", { state: { email } })} style={{
          backgroundColor: "#0a2540",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: responseStatus === "true" ? "not-allowed" : "pointer"
        }} disabled={responseStatus === "true"}>
          Scan!
        </button>
      </div>
      <button onClick={handleRegister} style={{
        backgroundColor: responseStatus ? "#0a2540" : "gray",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px 20px",
        cursor: responseStatus ? "pointer" : "not-allowed",
        marginTop: "10px"
      }} disabled={!responseStatus}>
        Register
      </button>
    </div>
  );
}

export default Register2;
