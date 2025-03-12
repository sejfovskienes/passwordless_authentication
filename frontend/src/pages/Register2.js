import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Register2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, challenge } = location.state || {};
  // const [responseStatus, setResponseStatus] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const responseStatus = queryParams.get("success");
  

  
  const openFaceScanWindow = () => {
    const faceScanWindow = window.open(
      "/face-scan",
      "FaceScan",
      "width=400,height=500,left=500,top=200"
    );

    window.addEventListener("message", (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data.success) {
        //setResponseStatus(true);
      }
    });
  };

  
  const handleLogin = async () => {
    if (!responseStatus) {
      alert("Please complete the face scan first!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/verify-face", {
        email,
        challenge,
      });

      if (response.data.success) {
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Face authentication failed.");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Error during login.");
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
        <button onClick={() => navigate("/face-scan?source=register")} style={{
          backgroundColor: "#0a2540",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: responseStatus === "true" ? "not-allowed" : "pointer"}}
          disabled={responseStatus === "true"}>
          Scan!
        </button>
      </div>
      <button onClick={handleLogin} style={{
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
